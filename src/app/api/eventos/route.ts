import { NextResponse } from "next/server";
import { verifySession } from "@/lib/session";
import type { Evento } from "@/lib/eventos";

const REPO = "omnaipt/alcainca-ac";
const FILE_PATH = "src/data/eventos.json";
const BRANCH = "master";

async function getGitHubFile() {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return { eventos: JSON.parse(content) as Evento[], sha: data.sha as string };
}

async function commitGitHubFile(eventos: Evento[], sha: string, message: string) {
  const content = Buffer.from(JSON.stringify(eventos, null, 2) + "\n").toString("base64");
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        message,
        content,
        sha,
        branch: BRANCH,
      }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub commit failed: ${res.status} ${err}`);
  }
  return res.json();
}

export async function GET() {
  try {
    const { eventos } = await getGitHubFile();
    return NextResponse.json(eventos);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const novoEvento: Evento = await req.json();

    // Generate ID from title + date
    novoEvento.id =
      novoEvento.titulo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      novoEvento.data;

    const { eventos, sha } = await getGitHubFile();
    eventos.push(novoEvento);
    eventos.sort((a, b) => a.data.localeCompare(b.data));

    await commitGitHubFile(eventos, sha, `Novo evento: ${novoEvento.titulo}`);
    return NextResponse.json(novoEvento, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const updated: Evento = await req.json();
    const { eventos, sha } = await getGitHubFile();
    const idx = eventos.findIndex((e) => e.id === updated.id);
    if (idx === -1) return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 });

    eventos[idx] = updated;
    eventos.sort((a, b) => a.data.localeCompare(b.data));

    await commitGitHubFile(eventos, sha, `Editar evento: ${updated.titulo}`);
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    const { eventos, sha } = await getGitHubFile();
    const filtered = eventos.filter((e) => e.id !== id);
    if (filtered.length === eventos.length) {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 });
    }

    await commitGitHubFile(filtered, sha, `Apagar evento: ${id}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
