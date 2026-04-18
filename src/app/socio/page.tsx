"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer, Nav } from "@/components/site";

export default function SocioPage() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), 60);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="page">
      <Nav current="socio" onDark />

      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "var(--c-primary)",
          color: "#fff",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          padding: "calc(var(--sp-10) + 60px) var(--sp-5) var(--sp-10)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(212,162,76,0.22) 0%, transparent 55%)," +
              "radial-gradient(ellipse at 15% 85%, rgba(43,94,255,0.28) 0%, transparent 55%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, #000 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, #000 40%, transparent 80%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", maxWidth: 760, textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 16px",
              border: "1px solid rgba(212,162,76,0.4)",
              background: "rgba(212,162,76,0.1)",
              borderRadius: 999,
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--c-accent)",
              marginBottom: "var(--sp-8)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--c-accent)",
                animation: "pulseDot 1.6s infinite",
              }}
            />
            Em construção
          </div>

          <div
            style={{
              fontFamily: "var(--f-display)",
              fontSize: "clamp(64px, 12vw, 150px)",
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#fff",
              marginBottom: "var(--sp-5)",
            }}
          >
            Sócio<br />
            <span
              style={{
                background: "linear-gradient(90deg, var(--c-accent), var(--c-accent-2))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              em breve.
            </span>
          </div>

          <p style={{ fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.78)", maxWidth: "52ch", margin: "0 auto var(--sp-7)" }}>
            Estamos a preparar o teu espaço: pagamento de quotas online, histórico, cartão digital, descontos em parceiros e ficha de sócio. Volta em breve.
          </p>

          <div style={{ maxWidth: 420, margin: "0 auto var(--sp-8)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>
              <span>A montar</span>
              <span>{Math.min(72, 30 + (count % 42))}%</span>
            </div>
            <div style={{ height: 4, borderRadius: 999, background: "rgba(255,255,255,0.12)", overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, bottom: 0, left: `${-30 + ((count * 1.2) % 130)}%`, width: "40%", background: "linear-gradient(90deg, transparent, var(--c-accent) 40%, var(--c-accent) 60%, transparent)", borderRadius: 999 }} />
            </div>
          </div>

          <div style={{ display: "flex", gap: "var(--sp-3)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contactos"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", background: "var(--c-accent)", color: "var(--c-primary-900)", fontFamily: "var(--f-display)", fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 999, textDecoration: "none", transition: "transform 0.2s" }}
            >
              Quero ser sócio <span>→</span>
            </Link>
            <Link
              href="/"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", fontFamily: "var(--f-display)", fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 999, textDecoration: "none", transition: "all 0.2s" }}
            >
              Voltar ao início
            </Link>
          </div>

          <div style={{ marginTop: "var(--sp-10)", display: "flex", alignItems: "center", gap: "var(--sp-3)", justifyContent: "center", fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
            <span style={{ width: 32, height: 1, background: "rgba(255,255,255,0.25)" }} />
            Alcainça AC · desde 1950
            <span style={{ width: 32, height: 1, background: "rgba(255,255,255,0.25)" }} />
          </div>
        </div>

        <style>{`
          @keyframes pulseDot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.7); }
          }
        `}</style>
      </section>

      <Footer />
    </div>
  );
}
