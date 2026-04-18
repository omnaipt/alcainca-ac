"use client";

import Link from "next/link";
import { Footer, Nav } from "@/components/site";

const TIMELINE = [
  { year: "1950", title: "Fundação", desc: "O Alcainça Atlético Clube é fundado a 6 de Abril de 1950, nascendo da paixão da comunidade pelo desporto.", badge: "Marco" },
  { year: "Anos 60-70", title: "Primeiros Passos", desc: "Os primeiros anos do clube são marcados pelo crescimento e pela consolidação no panorama desportivo local.", badge: "Consolidação" },
  { year: "Anos 80-90", title: "Crescimento", desc: "O clube expande as suas instalações e consolida a sua presença no panorama desportivo local.", badge: "Infra" },
  { year: "Anos 2000", title: "Novas Modalidades", desc: "Para além do futebol, o clube alarga a sua oferta desportiva com a patinagem artística.", badge: "Nova Era" },
  { year: "Presente", title: "Tradição e Futuro", desc: "Com 76 anos de história, o Alcainça AC continua a ser um pilar da comunidade, formando atletas e promovendo o desporto.", badge: "Hoje" },
];

const VALORES = [
  { t: "Comunidade", d: "Servimos a comunidade de Alcainça, promovendo a inclusão social através do desporto." },
  { t: "Formação", d: "Investimos na formação de atletas na patinagem artística, preparando-os para a competição." },
  { t: "Excelência", d: "Procuramos a excelência em tudo o que fazemos, com dedicação e trabalho de equipa." },
];

export default function HistoriaPage() {
  return (
    <div className="page">
      <Nav current="historia" onDark />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <div className="crumbs">
            <Link href="/">Início</Link>
            <span>/</span>
            <span>História</span>
          </div>
          <h1>76 anos <span className="gold">de história.</span></h1>
          <p className="page-hero__sub">
            Uma viagem desde 1950 até hoje. Pelos momentos, pelas pessoas, pelas conquistas que fizeram do Alcainça o clube que é.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <div className="eyebrow">O clube</div>
              <h2 className="h-lg" style={{ marginTop: "var(--sp-3)", marginBottom: "var(--sp-5)" }}>Desde 6 de abril de 1950.</h2>
            </div>
            <div className="prose">
              <p>
                <strong>O Alcainça Atlético Clube</strong> foi fundado a <strong>6 de Abril de 1950</strong>, na localidade de Alcainça, concelho de Mafra. Desde a sua fundação, o clube tem sido um símbolo de união e dedicação ao desporto, servindo a comunidade local e formando gerações de atletas.
              </p>
              <p>
                Com duas modalidades de destaque — <strong>futebol</strong> e <strong>patinagem artística</strong> — o Alcainça AC continua a crescer e a inspirar novos atletas, mantendo vivos os valores de companheirismo, esforço e paixão que marcam a sua história.
              </p>
              <blockquote>&quot;76 anos de paixão pelo desporto.&quot;</blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="eyebrow">Cronologia</div>
              <h2 className="h-xl" style={{ color: "#fff" }}>76 anos,<br />momento a momento.</h2>
            </div>
            <p className="section__intro" style={{ color: "rgba(255,255,255,0.7)" }}>
              Arrasta horizontalmente para percorrer a história do clube. Cada cartão é um marco.
            </p>
          </div>
          <div className="timeline">
            <div className="timeline__track">
              {TIMELINE.map((t, i) => (
                <div key={i} className="tl-item">
                  <div className="tl-item__badge">{t.badge}</div>
                  <div className="tl-item__year">{t.year}</div>
                  <div className="tl-item__title">{t.title}</div>
                  <div className="tl-item__desc">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="eyebrow">Os nossos valores</div>
              <h2 className="h-xl">O que nos<br />move.</h2>
            </div>
            <p className="section__intro">
              Três pilares que guiam o Alcainça AC desde 1950. Valores que passam de geração em geração.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--sp-5)" }}>
            {VALORES.map((v, i) => (
              <div key={i} style={{ padding: "var(--sp-6)", background: "var(--c-bg-alt)", border: "1px solid var(--c-line)", borderRadius: "var(--r-lg)", position: "relative" }}>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 64, color: "var(--c-accent)", lineHeight: 1, marginBottom: "var(--sp-3)" }}>0{i + 1}</div>
                <h3 className="h-md" style={{ marginBottom: "var(--sp-3)" }}>{v.t}</h3>
                <p style={{ fontSize: 15, color: "var(--c-ink-soft)", lineHeight: 1.6 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="stats">
            <div className="stat"><div className="stat__v"><span className="gold">76</span></div><div className="stat__k">Anos de história</div></div>
            <div className="stat"><div className="stat__v">2</div><div className="stat__k">Modalidades</div></div>
            <div className="stat"><div className="stat__v">1950</div><div className="stat__k">Ano de fundação</div></div>
            <div className="stat"><div className="stat__v">III</div><div className="stat__k">Divisão · AF Lisboa</div></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
