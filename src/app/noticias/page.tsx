"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer, Nav } from "@/components/site";

type NewsItem = {
  id: string;
  tag: string;
  art: "Clube" | "Site" | "Futebol" | "Patinagem";
  date: string;
  title: string;
  excerpt: string;
  body: string[];
  author: string;
  featured?: boolean;
};

const NEWS: NewsItem[] = [
  {
    id: "novo-site",
    tag: "Clube",
    art: "Site",
    date: "18 Abr 2026",
    title: "alcaincaac.pt estreia nova casa digital",
    excerpt: "Apresentamos a nova presença digital do Alcainça AC — mais rápida, mais clara e mais próxima dos adeptos, atletas e sócios.",
    featured: true,
    body: [
      "É com enorme orgulho que o Alcainça Atlético Clube inaugura hoje a sua nova presença digital. Mais do que um site renovado, é uma nova forma de estar ligado ao clube da nossa terra — desenhada a pensar em quem joga, treina, apoia e faz parte da família Alcainça.",
      "A nova plataforma foi construída em cima de três princípios: rapidez, clareza e proximidade. Queríamos que qualquer sócio ou adepto pudesse, num único sítio, ver o próximo jogo, acompanhar a classificação, conhecer os horários da patinagem, consultar os bailes de domingo e juntar-se ao clube.",
      "Em destaque ficam a classificação do Campeonato Distrital da III Divisão Série I atualizada automaticamente a partir da Federação Portuguesa de Futebol, o calendário completo dos bailes de domingo na sede, e uma secção inteiramente dedicada à patinagem artística — modalidade que, em dezembro de 2025, já contava com cerca de 70 atletas inscritos e 6 em regime de competição distrital e Open Nacional.",
      "Este é apenas o primeiro passo. Nas próximas semanas iremos reforçar a galeria com fotografias das provas, publicar as crónicas dos jogos, partilhar os resultados das nossas patinadoras e abrir o canal de sócios para inscrições 100% online.",
      "O Alcainça é, desde 1950, o clube da nossa terra. A partir de hoje, também online. Obrigado por fazerem parte.",
    ],
    author: "Direção",
  },
  {
    id: "senior-equipa",
    tag: "Futebol",
    art: "Futebol",
    date: "15 Abr 2026",
    title: "Sénior cimenta posição no meio da tabela",
    excerpt: "Na 25ª jornada da III Divisão Série I, o Alcainça consolida o 7º lugar com 39 pontos conquistados. Próximo compromisso: Igreja Nova, em casa.",
    body: [
      "A equipa sénior do Alcainça AC chega à reta final da época na 7ª posição da Série I do Campeonato Distrital da III Divisão da AF Lisboa, somando 39 pontos em 25 jornadas — fruto de 12 vitórias, 3 empates e 10 derrotas.",
      "Com 46 golos marcados e 43 sofridos, o saldo positivo reflete uma equipa competitiva que soube fazer-se respeitar em casa, no Campo João Simões, e disputar cada jornada até ao último minuto.",
      "O próximo desafio é no domingo, 19 de abril, com a receção ao Igreja Nova. A entrada é livre para sócios. Vem dar força à equipa.",
    ],
    author: "Secção de Futebol",
  },
  {
    id: "patinagem-crescimento",
    tag: "Patinagem",
    art: "Patinagem",
    date: "10 Abr 2026",
    title: "70 atletas inscritos e 6 em competição: patinagem em crescimento",
    excerpt: "A secção de Patinagem Artística fecha 2025 com números históricos e presença em competições distritais e no Open Nacional.",
    body: [
      "A época 2025/26 está a ser marcante para a secção de Patinagem Artística do Alcainça AC. À data de 31 de dezembro de 2025, o clube contava já com cerca de 70 atletas inscritos — um reflexo do crescimento sustentado e do interesse crescente pela modalidade na comunidade.",
      "Das 70 atletas, destacam-se 6 em regime de competição, representando o clube tanto a nível distrital como no Open Nacional, demonstrando o compromisso com a evolução técnica e desportiva.",
      "Ao longo da época, as atletas marcaram presença em diversos torneios, com várias medalhas conquistadas a nível individual e em equipa. Mais do que pódios, ficam as experiências, o espírito de equipa e o orgulho de representar o Alcainça.",
      "Este percurso é possível graças ao empenho das atletas, à dedicação da equipa técnica e ao apoio contínuo da direção. O objetivo para a próxima época é continuar a desenvolver a modalidade, elevar o nome do clube e formar atletas e cidadãos com valores sólidos.",
    ],
    author: "Secção de Patinagem",
  },
  {
    id: "inscricoes-26-27",
    tag: "Clube",
    art: "Clube",
    date: "02 Abr 2026",
    title: "Inscrições para 2026/27 abrem a 15 de maio",
    excerpt: "Estão a ser preparadas as inscrições para a próxima temporada em todas as modalidades — futebol sénior e patinagem artística (todos os níveis).",
    body: [
      "A direção do Alcainça AC informa que as inscrições para a época 2026/27 estarão abertas a partir de 15 de maio, tanto para a secção de futebol sénior como para a secção de patinagem artística em todos os escalões (Iniciação A e B, Pré-Competição A e B e Competição).",
      "As inscrições podem ser realizadas presencialmente na sede do clube ou através do formulário online. Mais informações serão publicadas aqui e nas redes sociais oficiais do clube.",
    ],
    author: "Direção",
  },
  {
    id: "empate-lider",
    tag: "Futebol",
    art: "Futebol",
    date: "28 Mar 2026",
    title: "Alcainça surpreende e empata fora com o Sobreirense",
    excerpt: "Num jogo intenso e disputado até ao último minuto, a equipa sénior trouxe de fora um ponto valioso contra um dos candidatos à subida.",
    body: [
      "A equipa sénior do Alcainça AC deslocou-se este sábado ao reduto do Sobreirense, um dos principais candidatos à subida na Série I, e trouxe para casa um empate importante.",
      "Com uma estratégia bem definida e grande solidariedade defensiva, os comandados do banco do Alcainça mostraram que, em qualquer palco, há sempre uma palavra a dizer. O resultado reforça a posição do clube no meio da tabela e levanta a moral para a reta final.",
      "Seguem-se semanas decisivas. A equipa precisa do apoio de todos — nas redes, nas bancadas e nas conversas no café.",
    ],
    author: "Secção de Futebol",
  },
];

const ART_BG: Record<NewsItem["art"], string> = {
  Clube: "linear-gradient(135deg, var(--c-primary) 0%, var(--c-primary-900) 60%, #0b1a3d 100%)",
  Site: "linear-gradient(135deg, #0d3d7c 0%, #0b1a3d 100%)",
  Futebol: "linear-gradient(135deg, #0d3d7c 0%, #1a5bb8 50%, #2a6fd0 100%)",
  Patinagem: "linear-gradient(135deg, #5a1a6b 0%, #8b2fa8 50%, #c14dd6 100%)",
};

export default function NoticiasPage() {
  const [open, setOpen] = useState<string | null>(null);
  const featured = NEWS.find((n) => n.featured);
  const rest = NEWS.filter((n) => !n.featured);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const article = open ? NEWS.find((n) => n.id === open) : null;

  return (
    <div className="page">
      <Nav current="noticias" onDark />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <div className="crumbs">
            <Link href="/">Início</Link>
            <span>/</span>
            <span>Notícias</span>
          </div>
          <h1>Notícias <span className="gold">do Clube.</span></h1>
          <p className="page-hero__sub">Tudo o que se passa no Alcainça, contado por quem o vive.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {featured && (
            <article
              className="news-card"
              onClick={() => setOpen(featured.id)}
              style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", marginBottom: "var(--sp-7)", minHeight: 420, cursor: "pointer" }}
            >
              <div className="news-card__img" style={{ aspectRatio: "auto", background: ART_BG[featured.art] }} />
              <div className="news-card__body" style={{ padding: "var(--sp-7)", justifyContent: "center" }}>
                <div className="news-card__meta">
                  <span className="news-card__tag">Destaque</span>
                  <span>{featured.tag} · {featured.date}</span>
                </div>
                <h3 className="news-card__title" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>{featured.title}</h3>
                <p className="news-card__excerpt" style={{ fontSize: 16 }}>{featured.excerpt}</p>
                <div style={{ marginTop: "var(--sp-5)" }}>
                  <span className="btn btn--outline" style={{ padding: "10px 18px", fontSize: 11 }}>Ler artigo completo →</span>
                </div>
              </div>
            </article>
          )}

          <div className="news">
            {rest.map((n) => (
              <article key={n.id} className="news-card" onClick={() => setOpen(n.id)} style={{ cursor: "pointer" }}>
                <div className="news-card__img" style={{ background: ART_BG[n.art] }} />
                <div className="news-card__body">
                  <div className="news-card__meta">
                    <span className="news-card__tag">{n.tag}</span>
                    <span>{n.date}</span>
                  </div>
                  <h3 className="news-card__title">{n.title}</h3>
                  <p className="news-card__excerpt">{n.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {article && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(null);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(8, 20, 46, 0.72)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "grid",
            placeItems: "center",
            padding: "var(--sp-5)",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            style={{
              position: "relative",
              background: "var(--c-bg)",
              borderRadius: "var(--r-lg)",
              maxWidth: 900,
              width: "100%",
              maxHeight: "92vh",
              overflow: "auto",
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(244,199,82,0.15)",
              animation: "modalIn 0.28s cubic-bezier(0.2, 0.9, 0.3, 1.1)",
            }}
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Fechar artigo"
              style={{
                position: "absolute",
                top: "var(--sp-5)",
                right: "var(--sp-5)",
                zIndex: 2,
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(8, 20, 46, 0.55)",
                backdropFilter: "blur(8px)",
                color: "#fff",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                transition: "all 0.2s",
                fontSize: 20,
                lineHeight: 1,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            <div style={{ position: "relative", aspectRatio: "16/8", overflow: "hidden", background: ART_BG[article.art] }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,20,46,0.15) 0%, rgba(8,20,46,0.55) 45%, rgba(8,20,46,0.95) 100%)" }} />
              <div style={{ position: "absolute", bottom: "var(--sp-6)", left: "var(--sp-7)", right: "calc(var(--sp-8) + 28px)", color: "#fff" }}>
                <div className="eyebrow" style={{ color: "var(--c-accent)", marginBottom: "var(--sp-3)" }}>
                  {article.tag} · {article.date}
                </div>
                <h2 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(28px, 3.2vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.01em", maxWidth: "22ch", textShadow: "0 2px 12px rgba(0,0,0,0.4)", color: "#fff" }}>
                  {article.title}
                </h2>
              </div>
            </div>

            <div style={{ padding: "var(--sp-7) clamp(var(--sp-5), 5vw, var(--sp-8))" }}>
              <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--c-ink)", fontFamily: "var(--f-body)", fontWeight: 500, borderLeft: "3px solid var(--c-accent)", paddingLeft: "var(--sp-5)", marginBottom: "var(--sp-7)" }}>
                {article.excerpt}
              </p>
              <div style={{ display: "grid", gap: "var(--sp-5)", fontSize: 16, lineHeight: 1.75, color: "var(--c-ink)" }}>
                {article.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div style={{ marginTop: "var(--sp-7)", paddingTop: "var(--sp-6)", borderTop: "1px solid var(--c-line)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--sp-4)", fontSize: 13, color: "var(--c-ink-soft)" }}>
                <div>Publicado por <strong style={{ color: "var(--c-ink)" }}>{article.author}</strong></div>
                <div>{article.date}</div>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes modalIn {
              from { opacity: 0; transform: translateY(20px) scale(0.96); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
