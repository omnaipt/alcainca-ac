"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Footer, Nav, Placeholder } from "@/components/site";

type Photo = {
  src: string;
  title: string;
  caption: string;
  tag: string;
  featured?: boolean;
};

const PHOTOS: Photo[] = [
  {
    src: "/assets/gal-fundadores.jpg",
    title: "Os Fundadores",
    caption:
      "Oferta da Junta de Freguesia de S. Miguel de Alcainça, 12 de julho de 1997. Manuel S. Marchante, Domingos Brás, Elisiário Francisco Farracho, Silvino D. Farracho, Hermenegildo V. Brás, José Vicente e Manuel S. Eugénio.",
    tag: "Arquivo · 1950",
    featured: true,
  },
  {
    src: "/assets/gal-equipamento.jpg",
    title: "Primeiro equipamento",
    caption: "Camisola azul e branca dos anos 50 — a mesma alma, outros tempos.",
    tag: "Arquivo · Anos 50",
  },
  {
    src: "/assets/gal-trofeus.jpg",
    title: "Vitrine de troféus",
    caption: "Décadas de conquistas no distrital de Lisboa, expostas na sede do clube.",
    tag: "Sede · Vitrine",
  },
];

const CELLS = [
  { cls: "big", label: "equipa sénior 2025/26" },
  { cls: "", label: "patinagem · treino" },
  { cls: "tall", label: "pavilhão · gala" },
  { cls: "wide", label: "campo · matchday" },
  { cls: "", label: "balneário" },
  { cls: "", label: "bancada" },
  { cls: "wide", label: "convívio de sócios" },
  { cls: "", label: "pódio · patinagem" },
];

export default function GaleriaPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const open = (i: number) => setLightbox(i);
  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i === null ? 0 : (i - 1 + PHOTOS.length) % PHOTOS.length)), []);
  const next = useCallback(() => setLightbox((i) => (i === null ? 0 : (i + 1) % PHOTOS.length)), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, next, prev]);

  const current = lightbox !== null ? PHOTOS[lightbox] : null;

  return (
    <div className="page">
      <Nav current="galeria" onDark />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <div className="crumbs">
            <Link href="/">Início</Link>
            <span>/</span>
            <span>Galeria</span>
          </div>
          <h1>Galeria <span className="gold">do Clube.</span></h1>
          <p className="page-hero__sub">Memórias de ontem e imagens de hoje. O Alcainça em fotografia.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="eyebrow">Arquivo histórico</div>
              <h2 className="h-xl">Memórias<br />do clube.</h2>
            </div>
            <p className="section__intro">
              Três imagens que contam a nossa história: os fundadores, o primeiro equipamento e a vitrine de troféus que cresce desde 1950. Clica para ampliar.
            </p>
          </div>
          <div className="gallery-archive">
            {PHOTOS.map((a, i) => (
              <div key={i} onClick={() => open(i)} className={`gallery-archive__item ${i === 0 ? "featured" : ""}`}>
                <img
                  src={a.src}
                  alt={a.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(8,20,46,0.85) 100%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "var(--sp-4)", right: "var(--sp-4)", width: 36, height: 36, borderRadius: "50%", background: "rgba(8,20,46,0.55)", color: "#fff", display: "grid", placeItems: "center", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="7" cy="7" r="5" />
                    <path d="M11 11L14 14" />
                  </svg>
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "var(--sp-5)", color: "#fff" }}>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-accent)", marginBottom: 6 }}>{a.tag}</div>
                  <div style={{ fontFamily: "var(--f-display)", fontSize: i === 0 ? 28 : 20, lineHeight: 1.1, color: "#fff" }}>{a.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="eyebrow">Momentos · 2025/26</div>
              <h2 className="h-xl">Dia-a-dia<br />do clube.</h2>
            </div>
            <p className="section__intro">
              Em breve aqui: fotografias dos jogos, treinos, bailes e convívios. Tens fotos? Envia-nos.
            </p>
          </div>
          <div className="gallery-grid">
            {CELLS.map((c, i) => (
              <div key={i} className={`g-cell ${c.cls}`}>
                <Placeholder label={c.label} />
                <div className="g-cell__overlay">
                  <div className="g-cell__meta">
                    <b>{c.label.split("·")[0]}</b>
                    Abr 2026
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {current && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(8, 20, 46, 0.94)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
            animation: "lbFade 0.25s ease-out",
          }}
        >
          <div className="lb-topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--sp-5) var(--sp-6)", color: "#fff" }}>
            <div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-accent)", marginBottom: 4 }}>{current.tag}</div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 24, lineHeight: 1.1 }}>{current.title}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-4)" }}>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, letterSpacing: "0.12em", color: "rgba(255,255,255,0.65)" }}>
                {String((lightbox ?? 0) + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}
              </div>
              <button
                onClick={close}
                aria-label="Fechar"
                style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "#fff", display: "grid", placeItems: "center", cursor: "pointer", transition: "all 0.2s" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <div style={{ position: "relative", display: "grid", placeItems: "center", padding: "0 var(--sp-5)", minHeight: 0 }}>
            <img
              key={lightbox}
              src={current.src}
              alt={current.title}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "var(--r-md)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)", animation: "lbZoom 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.05)" }}
            />
            <button onClick={prev} aria-label="Foto anterior" className="lb-arrow"
              style={{ position: "absolute", left: "var(--sp-5)", top: "50%", transform: "translateY(-50%)", width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "#fff", display: "grid", placeItems: "center", cursor: "pointer", transition: "all 0.2s", backdropFilter: "blur(8px)" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 3L5 9L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button onClick={next} aria-label="Foto seguinte" className="lb-arrow"
              style={{ position: "absolute", right: "var(--sp-5)", top: "50%", transform: "translateY(-50%)", width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "#fff", display: "grid", placeItems: "center", cursor: "pointer", transition: "all 0.2s", backdropFilter: "blur(8px)" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 3L13 9L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="lb-caption" style={{ padding: "var(--sp-5) var(--sp-6) var(--sp-6)", color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.6, maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            {current.caption}
          </div>

          <style>{`
            @keyframes lbFade { from { opacity: 0 } to { opacity: 1 } }
            @keyframes lbZoom {
              from { opacity: 0; transform: scale(0.96); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
