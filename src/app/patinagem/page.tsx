"use client";

import Link from "next/link";
import { Footer, Nav } from "@/components/site";

const LEVELS = [
  { name: "Iniciação A", desc: "Primeiros passos na patinagem artística." },
  { name: "Iniciação B", desc: "Consolidação das bases técnicas." },
  { name: "Pré-Competição A", desc: "Preparação para a competição." },
  { name: "Pré-Competição B", desc: "Transição para o nível competitivo." },
  { name: "Competição", desc: "Competição regional e nacional." },
];

type Slot = { h: string; what: string; k?: string };
const SCHEDULE: Array<{ day: string; slots: Slot[] }> = [
  { day: "Segunda", slots: [{ h: "17:30 – 18:30", what: "Pré-Competição B e Competição", k: "Livres" }] },
  {
    day: "Terça",
    slots: [
      { h: "17:30 – 18:15", what: "Iniciação A" },
      { h: "18:00 – 19:00", what: "Iniciação B" },
      { h: "19:00 – 20:30", what: "Pré-Competição A" },
    ],
  },
  {
    day: "Quarta",
    slots: [
      { h: "17:30 – 19:15", what: "Pré-Competição B", k: "Solo Dance" },
      { h: "18:30 – 20:30", what: "Competição", k: "Solo Dance" },
    ],
  },
  {
    day: "Quinta",
    slots: [
      { h: "17:30 – 18:15", what: "Iniciação A" },
      { h: "18:15 – 19:00", what: "Iniciação B" },
      { h: "19:00 – 20:30", what: "Pré-Competição A" },
    ],
  },
  {
    day: "Sexta",
    slots: [
      { h: "17:30 – 18:30", what: "Pré-Competição B", k: "Livres" },
      { h: "18:30 – 20:30", what: "Competição", k: "Livres" },
    ],
  },
  {
    day: "Sábado · Grupo 1",
    slots: [
      { h: "09:00 – 10:00", what: "Competição e Pré-Comp. B", k: "Treino s/ Patins" },
      { h: "10:00 – 11:00", what: "Pré-Competição B", k: "Solo Dance" },
      { h: "11:00 – 12:00", what: "Competição", k: "Solo Dance" },
    ],
  },
  {
    day: "Sábado · Grupo 2",
    slots: [
      { h: "09:00 – 10:00", what: "Pré-Competição A", k: "Solo Dance" },
      { h: "10:00 – 11:00", what: "Pré-Competição A", k: "Treino s/ Patins" },
      { h: "11:00 – 12:00", what: "Iniciação B", k: "Treino s/ Patins" },
      { h: "12:00 – 13:00", what: "Iniciação B", k: "Solo Dance" },
    ],
  },
];

export default function PatinagemPage() {
  return (
    <div className="page">
      <Nav current="patinagem" onDark />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <div className="crumbs">
            <Link href="/">Início</Link>
            <span>/</span>
            <span>Modalidades</span>
            <span>/</span>
            <span>Patinagem</span>
          </div>
          <h1>Patinagem <span className="gold">Artística.</span></h1>
          <p className="page-hero__sub">
            Crescimento desportivo, pessoal e social para todos os atletas. Uma secção em afirmação, com presença em provas distritais e no Open Nacional.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stats">
            <div className="stat">
              <div className="stat__v">~70</div>
              <div className="stat__k">Atletas inscritos <span style={{ display: "block", fontSize: 10, marginTop: 2, letterSpacing: "0.08em", color: "var(--c-ink-soft)" }}>(31 dez 2025)</span></div>
            </div>
            <div className="stat"><div className="stat__v">6<span className="gold">★</span></div><div className="stat__k">Atletas em competição</div></div>
            <div className="stat"><div className="stat__v">5</div><div className="stat__k">Níveis de formação</div></div>
            <div className="stat"><div className="stat__v"><span className="gold">Nacional</span></div><div className="stat__k">Distrital + Open Nacional</div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="eyebrow">A secção</div>
          <h2 className="h-xl" style={{ marginTop: "var(--sp-4)", marginBottom: "var(--sp-6)" }}>
            Um clube de <span className="gold">crescimento</span>.
          </h2>
          <div style={{ display: "grid", gap: "var(--sp-5)", fontSize: 17, lineHeight: 1.75, color: "var(--c-ink)" }}>
            <p>
              O Alcainça Atlético Clube tem vindo a afirmar-se na modalidade de Patinagem Artística, como um clube de crescimento desportivo, pessoal e social para todos os seus atletas.
            </p>
            <p>
              À data de <strong>31 de dezembro de 2025</strong>, contamos com cerca de <strong>70 atletas inscritos</strong>, refletindo o crescimento sustentado e o interesse crescente pela modalidade na nossa comunidade. Destes, destacam-se <strong>6 atletas em regime de competição</strong>, representando o clube tanto a nível distrital como no <strong>Open Nacional</strong>, demonstrando o compromisso com a evolução técnica e competitiva.
            </p>
            <p>
              Ao longo da época, as atletas marcaram presença em diversos torneios, tendo alcançado <strong>várias medalhas a nível individual e em equipa</strong>, proporcionando experiências competitivas enriquecedoras e promovendo o espírito de equipa, a superação individual e o orgulho em representar o Alcainça Atlético Clube.
            </p>
            <p style={{ paddingLeft: "var(--sp-5)", borderLeft: "3px solid var(--c-accent)", fontStyle: "italic", color: "var(--c-ink-soft)" }}>
              Este percurso só tem sido possível graças ao empenho dos atletas, à dedicação da equipa técnica e ao apoio contínuo da direção — sendo nosso objetivo continuar a desenvolver a modalidade, elevar o nome do clube e formar atletas e cidadãos com valores sólidos.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="eyebrow">Escalões</div>
              <h2 className="h-xl">Para todas<br />as idades.</h2>
            </div>
            <p className="section__intro">
              Da primeira vez sobre patins à competição federada. A patinagem Alcainça acompanha cada etapa.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--sp-4)" }}>
            {LEVELS.map((l, i) => (
              <div key={i} style={{ padding: "var(--sp-6)", background: "var(--c-bg-alt)", border: "1px solid var(--c-line)", borderRadius: "var(--r-lg)", display: "flex", flexDirection: "column", gap: "var(--sp-3)", position: "relative", overflow: "hidden" }}>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 56, color: "var(--c-accent)", lineHeight: 1 }}>0{i + 1}</div>
                <h3 className="h-md">{l.name}</h3>
                <p style={{ fontSize: 14, color: "var(--c-ink-soft)", lineHeight: 1.6 }}>{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="eyebrow">Horários de Treino · Época 2025/26</div>
              <h2 className="h-xl">Toda a<br />semana a patinar.</h2>
            </div>
            <p className="section__intro">
              De segunda a sábado. Horários distribuídos por níveis, com sessões de Solo Dance, patinagem Livres e treino sem patins.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--sp-4)" }}>
            {SCHEDULE.map((d, i) => (
              <div key={i} style={{ background: "var(--c-bg)", border: "1px solid var(--c-line)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
                <div style={{ padding: "var(--sp-4) var(--sp-5)", background: "var(--c-primary)", color: "#fff", fontFamily: "var(--f-display)", fontSize: 18, letterSpacing: "0.04em", textTransform: "uppercase" }}>{d.day}</div>
                <div>
                  {d.slots.map((s, j) => (
                    <div key={j} style={{ padding: "var(--sp-4) var(--sp-5)", borderTop: j === 0 ? "none" : "1px solid var(--c-line)", display: "flex", flexDirection: "column", gap: 4 }}>
                      <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--c-accent-600)", textTransform: "uppercase" }}>{s.h}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--c-ink)" }}>{s.what}</div>
                      {s.k && <div style={{ fontSize: 12, color: "var(--c-ink-soft)" }}>{s.k}</div>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "var(--sp-7)", padding: "var(--sp-6)", background: "var(--c-primary)", color: "#fff", borderRadius: "var(--r-lg)", display: "grid", gridTemplateColumns: "1fr auto", gap: "var(--sp-5)", alignItems: "center" }}>
            <div>
              <div className="eyebrow" style={{ color: "var(--c-accent)" }}>Experimenta</div>
              <h3 className="h-lg" style={{ color: "#fff", marginTop: "var(--sp-3)" }}>Aula experimental<br />gratuita.</h3>
              <p style={{ color: "rgba(255,255,255,0.75)", marginTop: "var(--sp-3)", maxWidth: "50ch", lineHeight: 1.6 }}>
                Aceitas o desafio? Vem experimentar uma aula gratuita e descobre o mundo da patinagem artística.
              </p>
            </div>
            <Link className="btn btn--primary" href="/contactos">
              Agendar aula →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
