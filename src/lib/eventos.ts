import "server-only";

export type Evento = {
  id: string;
  titulo: string;
  data: string; // YYYY-MM-DD
  hora: string;
  local: string;
  descricao: string;
  tipo: string; // Sócios, Baile, Evento, Aniversário
  marcacaoObrigatoria: boolean;
  destaque: boolean;
  imagem?: string;
};

const REPO = "omnaipt/alcainca-ac";
const FILE_PATH = "src/data/eventos.json";
const BRANCH = "master";

/** Fetch eventos from GitHub (always fresh) */
async function fetchEventosFromGitHub(): Promise<Evento[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 60 }, // cache for 60 seconds
      }
    );
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const data = await res.json();
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    return JSON.parse(content) as Evento[];
  } catch (err) {
    console.error("Failed to fetch eventos from GitHub:", err);
    // Fallback to local file
    const eventosData = (await import("@/data/eventos.json")).default;
    return eventosData as Evento[];
  }
}

/** Returns all events sorted by date ascending */
export async function getEventos(): Promise<Evento[]> {
  const eventos = await fetchEventosFromGitHub();
  return [...eventos].sort((a, b) => a.data.localeCompare(b.data));
}

/** Returns only future events (today's events still show) */
export async function getEventosFuturos(): Promise<Evento[]> {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const hojeStr = hoje.toISOString().slice(0, 10);

  const eventos = await getEventos();
  return eventos.filter((e) => e.data >= hojeStr);
}

/** Returns featured future events for homepage */
export async function getEventosDestaque(max = 4): Promise<Evento[]> {
  const futuros = await getEventosFuturos();
  const destaques = futuros.filter((e) => e.destaque);
  if (destaques.length >= max) return destaques.slice(0, max);
  const ids = new Set(destaques.map((e) => e.id));
  const extras = futuros.filter((e) => !ids.has(e.id));
  return [...destaques, ...extras].slice(0, max);
}

/** Badge color class based on event type */
export function getTipoBadgeClass(tipo: string): string {
  switch (tipo) {
    case "Sócios":
      return "bg-navy/10 text-navy";
    case "Aniversário":
      return "bg-gold/20 text-gold-dark";
    case "Baile":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
}
