import { NextResponse } from "next/server";
import { verifyEventosSession } from "@/lib/session";

const REPO = "omnaipt/alcainca-ac";
const BRANCH = "master";

export async function POST(req: Request) {
  const user = await verifyEventosSession();
  if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhum ficheiro enviado" }, { status: 400 });
    }

    // Validate file size (max 5MB for GitHub)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Imagem demasiado grande (máx 5MB)" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");

    // Generate unique filename
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const timestamp = Date.now();
    const safeName = `evento-${timestamp}.${ext}`;
    const filePath = `public/images/eventos/${safeName}`;

    // Upload to GitHub via API
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: `Imagem evento: ${safeName}`,
          content: base64,
          branch: BRANCH,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`GitHub upload failed: ${res.status} ${err}`);
    }

    // The image will be served at /images/eventos/filename
    const publicUrl = `/images/eventos/${safeName}`;
    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
