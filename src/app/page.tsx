"use client";

import Link from "next/link";
import { Crest, Footer, HeroBg, Nav, useClubData, useCountdown, useParsedFpfDate } from "@/components/site";

export default function HomePage() {
  const clubData = useClubData();
  const fpf = clubData.fpf;
  const nextFpf = fpf?.next_match;

  const parsed = useParsedFpfDate(nextFpf?.date);
  const fallbackTarget = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    d.setHours(16, 0, 0, 0);
    return d;
  })();
  const matchDate = parsed || fallbackTarget;
  const cd = useCountdown(matchDate.getTime());

  const nextHome = nextFpf?.home || "Sobreirense";
  const nextAway = nextFpf?.away || "Alcainça";
  const isAway = nextFpf ? !/alcain/i.test(nextHome) : true;
  const compLabel = fpf?.competition?.name
    ? `${fpf.competition.name}${fpf.competition.serie ? " · " + fpf.competition.serie : ""}`
    : "III Divisão Série 1";

  const news = [
    { tag: "Clube", date: "Mar 2026", title: "Novo site do Alcainça AC", excerpt: "Apresentamos a nova presença digital do clube — mais rápida, clara e próxima dos adeptos." },
    { tag: "Futebol", date: "Abr 2026", title: "Sénior cimenta posição no meio da tabela", excerpt: "Vitória tangencial em casa e segunda jornada consecutiva sem sofrer golos." },
    { tag: "Patinagem", date: "Abr 2026", title: "Atletas brilham em prova regional", excerpt: "Três pódios e uma classificação inédita para as mais jovens. Parabéns a todas!" },
  ];

  const newsBg: Record<string, string> = {
    Clube: "linear-gradient(135deg, var(--c-primary) 0%, var(--c-primary-900) 60%, #0b1a3d 100%)",
    Futebol: "linear-gradient(135deg, #0d3d7c 0%, #1a5bb8 50%, #2a6fd0 100%)",
    Patinagem: "linear-gradient(135deg, #5a1a6b 0%, #8b2fa8 50%, #c14dd6 100%)",
  };

  return (
    <div className="page">
      <Nav current="home" onDark />

      <section className="hero" data-layout="mosaic">
        <HeroBg />
        <div className="container hero__content">
          <div className="hero__grid">
            <div>
              <div className="eyebrow hero__eyebrow">Desde 1950</div>
              <h1 className="hero__title h-display">
                O clube<br />
                <span className="gold">da nossa</span><br />
                terra.
              </h1>
              <p className="hero__sub">
                76 anos de paixão, suor e pertença. Futebol e patinagem artística com as cores que nos unem.
              </p>
              <div className="hero__ctas">
                <Link className="btn btn--primary" href="/contactos">
                  Junta-te ao Clube <span className="btn__arrow">→</span>
                </Link>
                <Link className="btn btn--ghost" href="/historia">
                  Ver a História
                </Link>
              </div>
            </div>
            <div className="hero__side">
              <div className="hero__mini-card">
                <div className="eyebrow">Próximo Jogo {nextFpf?.date ? "· " + nextFpf.date : ""}</div>
                <h4>{nextHome} vs. {nextAway}</h4>
                <p>{compLabel} · {isAway ? "Fora" : "Casa"}</p>
                <div className="match__countdown" style={{ marginTop: "var(--sp-4)" }}>
                  <div className="match__cd-cell"><div className="match__cd-v">{String(cd.d).padStart(2, "0")}</div><div className="match__cd-k">Dias</div></div>
                  <div className="match__cd-cell"><div className="match__cd-v">{String(cd.h).padStart(2, "0")}</div><div className="match__cd-k">Hrs</div></div>
                  <div className="match__cd-cell"><div className="match__cd-v">{String(cd.m).padStart(2, "0")}</div><div className="match__cd-k">Min</div></div>
                </div>
              </div>
              <div className="hero__mini-card">
                <div className="eyebrow">Comunidade</div>
                <h4>320+ atletas &amp; sócios</h4>
                <p>Da iniciação ao sénior. Clube familiar, aberto e com alma.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero__meta">
          <div className="hero__meta-inner">
            <div className="hero__meta-item">
              <div className="hero__meta-k">Fundação</div>
              <div className="hero__meta-v">06 · 04 · <span className="gold">1950</span></div>
            </div>
            <div className="hero__meta-item">
              <div className="hero__meta-k">Modalidades</div>
              <div className="hero__meta-v">Futebol · Patinagem</div>
            </div>
            <div className="hero__meta-item">
              <div className="hero__meta-k">Competição</div>
              <div className="hero__meta-v">III Div · <span className="gold">Série 1</span></div>
            </div>
            <div className="hero__meta-item">
              <div className="hero__meta-k">Época</div>
              <div className="hero__meta-v">2025<span className="gold">/</span>26</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modalidades */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="eyebrow">As nossas modalidades</div>
              <h2 className="h-xl">Duas modalidades,<br />uma só família.</h2>
            </div>
            <p className="section__intro">
              Do relvado ao ringue, cada secção do Alcainça AC partilha a mesma ambição: formar atletas e formar pessoas.
            </p>
          </div>
          <div className="mods">
            <Link href="/futebol" className="mod-card">
              <div className="mod-card__bg" />
              <div>
                <div className="mod-card__num">01 / Modalidade</div>
                <h3 className="mod-card__title">Futebol</h3>
                <p className="mod-card__desc">
                  A modalidade rainha do clube. Equipa sénior na III Divisão Série 1 da AF Lisboa, desde 1950.
                </p>
              </div>
              <div className="mod-card__footer">
                <div className="mod-card__meta">
                  <b>III Divisão · Série 1</b>
                  Equipa sénior · Época 2025/26
                </div>
                <div className="mod-card__arrow">→</div>
              </div>
            </Link>
            <Link href="/patinagem" className="mod-card mod-card--patinagem">
              <div className="mod-card__bg" />
              <div>
                <div className="mod-card__num">02 / Modalidade</div>
                <h3 className="mod-card__title">Patinagem<br />Artística</h3>
                <p className="mod-card__desc">
                  Elegância e técnica em cada apresentação. Formamos atletas de excelência, com paixão pelo desporto.
                </p>
              </div>
              <div className="mod-card__footer">
                <div className="mod-card__meta">
                  <b>Federação Portuguesa de Patinagem</b>
                  Escola · Competição · Galas
                </div>
                <div className="mod-card__arrow">→</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Próximo jogo detalhado */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="eyebrow">Matchday</div>
              <h2 className="h-xl">Próximo jogo.</h2>
            </div>
            <p className="section__intro">
              Aparece. Faz parte. O Alcainça joga em casa e precisa de ti na bancada.
            </p>
          </div>
          <div className="match">
            <div className="match__head">
              <span>{compLabel}</span>
              <span className="match__live"><span /> Em {cd.d} dias</span>
            </div>
            <div className="match__body">
              <div className="match__team match__team--home">
                <div className="match__crest">{isAway ? nextHome.slice(0, 3).toUpperCase() : <Crest size={56} />}</div>
                <div>
                  <div className="match__team-name">{isAway ? nextHome : "Alcainça AC"}</div>
                  <div className="match__team-sub">Casa</div>
                </div>
              </div>
              <div className="match__vs">
                <div className="match__countdown">
                  <div className="match__cd-cell"><div className="match__cd-v">{String(cd.d).padStart(2, "0")}</div><div className="match__cd-k">Dias</div></div>
                  <div className="match__cd-cell"><div className="match__cd-v">{String(cd.h).padStart(2, "0")}</div><div className="match__cd-k">Hrs</div></div>
                  <div className="match__cd-cell"><div className="match__cd-v">{String(cd.m).padStart(2, "0")}</div><div className="match__cd-k">Min</div></div>
                  <div className="match__cd-cell"><div className="match__cd-v">{String(cd.s).padStart(2, "0")}</div><div className="match__cd-k">Seg</div></div>
                </div>
              </div>
              <div className="match__team match__team--away">
                <div className="match__crest">{isAway ? <Crest size={56} /> : nextAway.slice(0, 3).toUpperCase()}</div>
                <div>
                  <div className="match__team-name">{isAway ? "Alcainça AC" : nextAway}</div>
                  <div className="match__team-sub">Fora</div>
                </div>
              </div>
            </div>
            <div className="match__foot">
              <span>{nextFpf?.date || "Data a confirmar"} · {compLabel}</span>
              <span>Entrada livre para sócios</span>
              <Link className="btn btn--primary" href="/calendario" style={{ padding: "10px 20px", fontSize: 11 }}>Ver calendário →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Notícias */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="eyebrow">O que se passa</div>
              <h2 className="h-xl">Últimas do clube.</h2>
            </div>
            <p className="section__intro">
              Resultados, entrevistas, convívios e tudo o que move o Alcainça durante a semana.
            </p>
          </div>
          <div className="news">
            {news.map((n, i) => (
              <Link key={i} href="/noticias" className="news-card">
                <div className="news-card__img" style={{ background: newsBg[n.tag] || newsBg.Clube }} />
                <div className="news-card__body">
                  <div className="news-card__meta">
                    <span className="news-card__tag">{n.tag}</span>
                    <span>{n.date}</span>
                  </div>
                  <h3 className="news-card__title">{n.title}</h3>
                  <p className="news-card__excerpt">{n.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <div className="eyebrow" style={{ color: "var(--c-accent)" }}>Junta-te</div>
            <h2 className="h-xl" style={{ marginTop: "var(--sp-4)" }}>O clube só existe<br />com quem o faz.</h2>
            <p style={{ marginTop: "var(--sp-5)" }}>
              Torna-te sócio, experimenta a patinagem artística, apoia a equipa sénior, ou apareça no próximo jogo. O Alcainça é de todos.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-4)" }}>
            <Link className="btn btn--primary" href="/socio">
              Quero ser sócio <span className="btn__arrow">→</span>
            </Link>
            <Link className="btn btn--ghost" href="/contactos">
              Inscrever atleta
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
