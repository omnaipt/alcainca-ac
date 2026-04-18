"use client";

import Link from "next/link";
import { Footer, Nav, useClubData } from "@/components/site";

type FallbackRow = { p: number; t: string; j: number; v: number; e: number; d: number; pts: number; own?: boolean };
const FALLBACK_TABLE: FallbackRow[] = [
  { p: 1, t: "Venda Pinheiro", j: 25, v: 20, e: 3, d: 2, pts: 63 },
  { p: 2, t: "Negrais", j: 25, v: 18, e: 4, d: 3, pts: 58 },
  { p: 3, t: "Igreja Nova", j: 25, v: 18, e: 4, d: 3, pts: 58 },
  { p: 4, t: "São Pedro", j: 25, v: 17, e: 6, d: 2, pts: 57 },
  { p: 5, t: "Vilafranquense", j: 25, v: 16, e: 6, d: 3, pts: 54 },
  { p: 6, t: "Sobreirense", j: 25, v: 12, e: 6, d: 7, pts: 42 },
  { p: 7, t: "Alcainça", j: 25, v: 12, e: 3, d: 10, pts: 39, own: true },
  { p: 8, t: "Monte Agraço", j: 25, v: 12, e: 2, d: 11, pts: 38 },
];

export default function FutebolPage() {
  const clubData = useClubData();
  const fpf = clubData.fpf;
  const stats = fpf?.stats || {
    position: 7,
    played: 25,
    wins: 12,
    draws: 3,
    losses: 10,
    goals_for: 46,
    goals_against: 43,
    points: 39,
    form: ["V", "D", "V", "V", "D"],
  };
  const table: FallbackRow[] = fpf?.standings?.length
    ? fpf.standings.map((r) => ({
        p: r.pos,
        t: r.team,
        j: r.played,
        v: r.wins,
        e: r.draws,
        d: r.losses,
        pts: r.points,
        own: /alcain/i.test(r.team),
      }))
    : FALLBACK_TABLE;
  const form = stats.form?.length ? stats.form : ["D", "V", "V", "D", "D"];
  const compTitle = fpf?.competition?.name || "CD III Divisão";
  const compSub = fpf?.competition?.association || "AF Lisboa";
  const compTitleHead = compTitle.split(" ").slice(0, 2).join(" ");

  return (
    <div className="page">
      <Nav current="futebol" onDark />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <div className="crumbs">
            <Link href="/">Início</Link>
            <span>/</span>
            <span>Modalidades</span>
            <span>/</span>
            <span>Futebol</span>
          </div>
          <h1>Secção de <span className="gold">Futebol.</span></h1>
          <p className="page-hero__sub">
            A espinha dorsal do clube desde 1950. Equipa sénior na CD III Divisão Série I da AF Lisboa, época 2025/26. Disputou ainda a <strong>2ª Pré-Eliminatória da Taça AFL</strong>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stats">
            <div className="stat"><div className="stat__v">{stats.played}</div><div className="stat__k">Jogos disputados</div></div>
            <div className="stat"><div className="stat__v">{stats.wins}<span className="gold">V</span></div><div className="stat__k">Vitórias</div></div>
            <div className="stat"><div className="stat__v">{stats.draws}<span className="gold">E</span></div><div className="stat__k">Empates</div></div>
            <div className="stat"><div className="stat__v">{stats.losses}<span className="gold">D</span></div><div className="stat__k">Derrotas</div></div>
          </div>
          <div style={{ marginTop: "var(--sp-5)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--sp-3)" }}>
            <div className="stat" style={{ border: "1px solid var(--c-line)", borderRadius: "var(--r-lg)" }}>
              <div className="stat__v">{stats.goals_for}<span style={{ color: "var(--c-ink-soft)", fontSize: "0.6em" }}> · </span>{stats.goals_against}</div>
              <div className="stat__k">Golos marcados / sofridos</div>
            </div>
            <div className="stat" style={{ border: "1px solid var(--c-line)", borderRadius: "var(--r-lg)" }}>
              <div style={{ display: "flex", gap: "var(--sp-2)", marginBottom: "var(--sp-2)" }}>
                {form.map((f, i) => (
                  <span
                    key={i}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      fontFamily: "var(--f-display)",
                      fontSize: 16,
                      background: f === "V" ? "var(--c-accent)" : f === "E" ? "var(--c-bg-alt)" : "var(--c-primary)",
                      color: f === "V" ? "var(--c-primary-900)" : f === "E" ? "var(--c-ink)" : "#fff",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div className="stat__k">Últimos 5 jogos</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="eyebrow">Classificação</div>
              <h2 className="h-xl">{compTitleHead}<br />{compSub}.</h2>
            </div>
            <p className="section__intro">
              {compTitle}{fpf?.competition?.serie ? " · " + fpf.competition.serie : ""}. {fpf?._meta?.last_updated ? `Atualizado ${new Date(fpf._meta.last_updated).toLocaleDateString("pt-PT")}.` : "O Alcainça segue em zona confortável, com uma época equilibrada."}
            </p>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th><th>Equipa</th><th className="hide-sm">J</th><th className="hide-sm">V</th><th className="hide-sm">E</th><th className="hide-sm">D</th><th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {table.map((r) => (
                <tr key={r.p} className={r.own ? "own" : ""}>
                  <td><span className="pos-badge">{r.p}</span></td>
                  <td>{r.t}</td>
                  <td className="hide-sm">{r.j}</td>
                  <td className="hide-sm">{r.v}</td>
                  <td className="hide-sm">{r.e}</td>
                  <td className="hide-sm">{r.d}</td>
                  <td><strong>{r.pts}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="eyebrow">Histórico</div>
              <h2 className="h-xl">Épocas<br />anteriores.</h2>
            </div>
            <p className="section__intro">
              Um registo da caminhada do Alcainça na AF Lisboa. Cada época é um capítulo.
            </p>
          </div>
          <div style={{ display: "grid", gap: "var(--sp-3)" }}>
            {[{ season: "2024/25", comp: "III Divisão Série 1 · AFL", pos: "15º", pts: 35, taca: "Taça AFL · 2ª Pré-Eliminatória" }].map((e, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto auto auto",
                  gap: "var(--sp-5)",
                  alignItems: "center",
                  padding: "var(--sp-5) var(--sp-6)",
                  background: "var(--c-bg-alt)",
                  border: "1px solid var(--c-line)",
                  borderRadius: "var(--r-lg)",
                }}
              >
                <div style={{ fontFamily: "var(--f-display)", fontSize: 28, letterSpacing: "0.02em", color: "var(--c-ink)" }}>{e.season}</div>
                <div>
                  <div style={{ fontSize: 14, color: "var(--c-ink)", fontWeight: 600 }}>{e.comp}</div>
                  <div style={{ fontSize: 12, color: "var(--c-ink-soft)", marginTop: 4 }}>{e.taca}</div>
                </div>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-ink-soft)" }}>Pos.</div>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 32, color: "var(--c-accent-600)" }}>{e.pos}</div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", paddingLeft: "var(--sp-4)", borderLeft: "1px solid var(--c-line)" }}>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-ink-soft)" }}>Pts</div>
                  <div style={{ fontFamily: "var(--f-display)", fontSize: 28 }}>{e.pts}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
