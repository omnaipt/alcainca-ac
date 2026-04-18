"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer, Nav } from "@/components/site";

const M = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const W = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

// Bailes 2026 — programa oficial de acordionistas (Domingos 16:00 na Sede)
const BAILES = [
  { date: "2026-05-03", artist: "Trio Clave" },
  { date: "2026-05-10", artist: "Gina Reis" },
  { date: "2026-05-17", artist: "Eurico Martins & Cristina" },
  { date: "2026-05-24", artist: "Paulo Gamito" },
  { date: "2026-05-31", artist: "João do Carmo" },
  { date: "2026-06-07", artist: "João de Castro" },
  { date: "2026-06-14", artist: "Mário Neves" },
  { date: "2026-06-21", artist: "Hélio Esteves" },
  { date: "2026-06-28", artist: "Paulo das Vacas" },
  { date: "2026-07-05", artist: "Tozé Pratas e Dina Teresa" },
  { date: "2026-07-12", artist: "Gina Reis" },
  { date: "2026-07-19", artist: "João do Carmo" },
  { date: "2026-07-26", artist: "Tozé Pratas e Dina Teresa" },
];

type CalEvent = {
  d: number;
  m: string;
  w: string;
  h: string;
  title: string;
  tag: string;
  place: string;
  status: string;
  sortKey: number;
};

const FIXOS: CalEvent[] = [
  {
    d: 19,
    m: "Abr",
    w: "Dom",
    h: "16:00",
    title: "Alcainça vs. Igreja Nova",
    tag: "Futebol",
    place: "Campo João Simões",
    status: "III Divisão · Série I",
    sortKey: new Date(2026, 3, 19).getTime(),
  },
];

export default function CalendarioPage() {
  const [filter, setFilter] = useState<string>("todos");
  const [extraEvents, setExtraEvents] = useState<CalEvent[]>([]);
  const [loadingExtra, setLoadingExtra] = useState(true);

  const bailesEvents: CalEvent[] = BAILES.map((b) => {
    const [y, mo, da] = b.date.split("-").map(Number);
    const dt = new Date(y, mo - 1, da);
    return {
      d: da,
      m: M[mo - 1],
      w: W[dt.getDay()],
      h: "16:00",
      title: `Baile · ${b.artist}`,
      tag: "Bailes",
      place: "Sede do clube",
      status: "Entrada livre",
      sortKey: dt.getTime(),
    };
  });

  // Puxa eventos do admin (same-origin — serve mesmo domínio via /api/eventos)
  useEffect(() => {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 4000);
    fetch("/api/eventos", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : []))
      .then((list: unknown) => {
        const arr = Array.isArray(list) ? list : (list as { eventos?: unknown[] })?.eventos || [];
        const mapped: CalEvent[] = (arr as Array<Record<string, unknown>>).map((e) => {
          const dateStr = (e.date as string) || (e.data as string) || "";
          const dt = new Date(dateStr);
          if (isNaN(dt.getTime())) {
            return null as unknown as CalEvent;
          }
          const hora =
            (e.time as string) ||
            (e.hora as string) ||
            (dt.getHours() ? `${String(dt.getHours()).padStart(2, "0")}:${String(dt.getMinutes()).padStart(2, "0")}` : "");
          return {
            d: dt.getDate(),
            m: M[dt.getMonth()],
            w: W[dt.getDay()],
            h: hora,
            title: ((e.title as string) || (e.titulo as string) || "Evento"),
            tag: ((e.tag as string) || (e.categoria as string) || (e.tipo as string) || "Clube"),
            place: ((e.place as string) || (e.local as string) || "Sede do clube"),
            status: ((e.status as string) || (e.estado as string) || ""),
            sortKey: dt.getTime(),
          };
        }).filter(Boolean);
        setExtraEvents(mapped);
      })
      .catch(() => setExtraEvents([]))
      .finally(() => {
        setLoadingExtra(false);
        clearTimeout(timeout);
      });
    return () => {
      ctrl.abort();
      clearTimeout(timeout);
    };
  }, []);

  const allEvents = [...FIXOS, ...bailesEvents, ...extraEvents].sort((a, b) => a.sortKey - b.sortKey);
  const tags = ["todos", "Futebol", "Patinagem", "Bailes", "Clube"];
  const filtered = filter === "todos" ? allEvents : allEvents.filter((e) => e.tag === filter);

  return (
    <div className="page">
      <Nav current="calendario" onDark />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <div className="crumbs">
            <Link href="/">Início</Link>
            <span>/</span>
            <span>Calendário</span>
          </div>
          <h1>Calendário <span className="gold">& Eventos.</span></h1>
          <p className="page-hero__sub">Jogos, bailes, eventos do clube. Tudo o que acontece em Alcainça, num só sítio.</p>
        </div>
      </section>

      {/* Destaque Bailes */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div style={{ padding: "var(--sp-7)", background: "linear-gradient(135deg, var(--c-primary) 0%, var(--c-primary-900) 100%)", color: "#fff", borderRadius: "var(--r-lg)", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "var(--sp-6)", alignItems: "center" }}>
            <div style={{ width: 88, height: 88, borderRadius: "50%", background: "var(--c-accent)", color: "var(--c-primary-900)", display: "grid", placeItems: "center", fontFamily: "var(--f-display)", fontSize: 36, lineHeight: 1 }}>🪗</div>
            <div>
              <div className="eyebrow" style={{ color: "var(--c-accent)" }}>Todos os domingos · 16:00</div>
              <h2 className="h-xl" style={{ color: "#fff", marginTop: "var(--sp-3)" }}>Bailes na Sede.</h2>
              <p style={{ color: "rgba(255,255,255,0.75)", marginTop: "var(--sp-3)", maxWidth: "55ch", lineHeight: 1.6 }}>
                O baile de domingo é tradição em Alcainça. Acordeonistas convidados semana a semana, sempre às 16h na sede do clube. Entrada livre.
              </p>
            </div>
            <div style={{ textAlign: "right", fontFamily: "var(--f-display)", fontSize: 56, color: "var(--c-accent)", lineHeight: 1 }}>
              {BAILES.length}
              <div style={{ fontSize: 11, fontFamily: "var(--f-mono)", letterSpacing: "0.12em", color: "rgba(255,255,255,0.65)", marginTop: 6 }}>BAILES AGENDADOS</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: "flex", gap: "var(--sp-3)", marginBottom: "var(--sp-6)", flexWrap: "wrap", alignItems: "center" }}>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                style={{
                  padding: "10px 20px",
                  background: filter === t ? "var(--c-primary)" : "transparent",
                  color: filter === t ? "#fff" : "var(--c-ink)",
                  border: `1px solid ${filter === t ? "var(--c-primary)" : "var(--c-line)"}`,
                  borderRadius: 999,
                  fontFamily: "var(--f-body)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {t}
              </button>
            ))}
            {loadingExtra && (
              <span style={{ fontSize: 11, color: "var(--c-ink-soft)", fontFamily: "var(--f-mono)", letterSpacing: "0.12em" }}>
                a carregar admin…
              </span>
            )}
          </div>
          <div className="cal-list">
            {filtered.map((e, i) => (
              <div key={i} className="cal-row">
                <div className="cal-row__date">
                  <div className="d">{e.d}</div>
                  <div className="m">{e.m}</div>
                </div>
                <div className="cal-row__body">
                  <h4>{e.title}</h4>
                  <div className="cal-row__meta">
                    <span>{e.w} · {e.h}</span>
                    <span>· {e.place}</span>
                    {e.status && <span>· {e.status}</span>}
                  </div>
                </div>
                <span className={`cal-row__tag ${e.tag === "Clube" || e.tag === "Bailes" ? "cal-row__tag--muted" : ""}`}>{e.tag}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "var(--sp-7)", padding: "var(--sp-5)", background: "var(--c-bg-alt)", border: "1px dashed var(--c-line)", borderRadius: "var(--r-lg)", fontSize: 13, color: "var(--c-ink-soft)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--sp-4)", flexWrap: "wrap" }}>
            <span>
              <strong style={{ color: "var(--c-ink)" }}>Admin de eventos:</strong> os eventos criados em eventos.alcaincaac.pt aparecem aqui automaticamente.
            </span>
            <a href="https://eventos.alcaincaac.pt/admin/eventos/login" target="_blank" rel="noopener" style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-primary)", fontWeight: 600, textDecoration: "none" }}>
              Abrir painel →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
