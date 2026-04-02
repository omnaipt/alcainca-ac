import eventosData from "@/data/eventos.json";

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
  imagem?: string; // URL da imagem de divulgação (Google Drive)
};

const eventos: Evento[] = eventosData;

/** Returns all events sorted by date ascending */
export function getEventos(): Evento[] {
  return [...eventos].sort((a, b) => a.data.localeCompare(b.data));
}

/** Returns only future events (today's events still show) */
export function getEventosFuturos(): Evento[] {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const hojeStr = hoje.toISOString().slice(0, 10);

  return getEventos().filter((e) => e.data >= hojeStr);
}

/** Returns featured future events for homepage */
export function getEventosDestaque(max = 4): Evento[] {
  const futuros = getEventosFuturos();
  const destaques = futuros.filter((e) => e.destaque);
  // If not enough featured, fill with next upcoming
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
