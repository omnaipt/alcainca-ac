"use client";

/**
 * Shared components e hooks do design v2.
 * Portado de shared.jsx (Alcaincaac.zip) para Next.js.
 */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

// ============ CREST ============
export function Crest({ size = 40 }: { size?: number }) {
  const ratio = 196 / 171;
  return (
    <img
      src="/assets/crest.png"
      alt="Alcainça Atlético Clube"
      width={size}
      height={size * ratio}
      style={{ display: "block", objectFit: "contain" }}
    />
  );
}

// ============ NAV ============
const NAV_LINKS = [
  { key: "home", label: "Início", href: "/" },
  { key: "historia", label: "História", href: "/historia" },
  { key: "futebol", label: "Futebol", href: "/futebol" },
  { key: "patinagem", label: "Patinagem", href: "/patinagem" },
  { key: "calendario", label: "Calendário", href: "/calendario" },
  { key: "noticias", label: "Notícias", href: "/noticias" },
  { key: "galeria", label: "Galeria", href: "/galeria" },
  { key: "contactos", label: "Contactos", href: "/contactos" },
] as const;

export type NavKey =
  | "home"
  | "historia"
  | "futebol"
  | "patinagem"
  | "calendario"
  | "noticias"
  | "galeria"
  | "contactos"
  | "socio";

export function Nav({ current = "home", onDark = false }: { current?: NavKey; onDark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""} ${onDark ? "on-dark" : ""}`}>
      <div className="container nav__inner">
        <Link href="/" className="nav__brand" onClick={() => setOpen(false)}>
          <Crest size={44} />
          <div>
            <div className="nav__logo-text">Alcainça AC</div>
            <div className="nav__logo-sub">Desde 1950</div>
          </div>
        </Link>
        <div className={`nav__links ${open ? "open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className={`nav__link ${current === l.key ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/socio"
            className={`nav__cta ${current === "socio" ? "active" : ""}`}
            onClick={() => setOpen(false)}
          >
            Sócio
          </Link>
        </div>
        <button
          className="nav__burger"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}

// ============ FOOTER ============
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__brand-head">
              <Crest size={56} />
              <div>
                <div className="footer__name">Alcainça AC</div>
                <div className="footer__since">Desde 6 de Abril de 1950</div>
              </div>
            </div>
            <p className="footer__about">
              Clube desportivo ao serviço da comunidade de Alcainça, promovendo o
              desporto e os valores de equipa há 76 anos.
            </p>
          </div>
          <div>
            <h5 className="footer__h">Navegação</h5>
            <ul className="footer__list">
              <li>
                <Link href="/historia">História</Link>
              </li>
              <li>
                <Link href="/futebol">Futebol</Link>
              </li>
              <li>
                <Link href="/patinagem">Patinagem</Link>
              </li>
              <li>
                <Link href="/calendario">Calendário</Link>
              </li>
              <li>
                <Link href="/galeria">Galeria</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="footer__h">Clube</h5>
            <ul className="footer__list">
              <li>
                <Link href="/noticias">Notícias</Link>
              </li>
              <li>
                <Link href="/socio">Ser Sócio</Link>
              </li>
              <li>
                <Link href="/contactos">Parcerias</Link>
              </li>
              <li>
                <Link href="/contactos">Loja</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="footer__h">Contactos</h5>
            <div className="footer__contact">
              Rua da Junta de Freguesia
              <br />
              Alcainça, Mafra
              <br />
              <br />
              <a href="mailto:geral@alcaincaac.pt">geral@alcaincaac.pt</a>
              <br />
              <a href="tel:219863805">219 863 805</a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div>© 2026 Alcainça Atlético Clube · Todos os direitos reservados</div>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 10h4l-1 4h-3v7h-4v-7H7v-4h2V8a4 4 0 0 1 4-4h3v4h-3z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17" cy="7" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C15.4 5 12 5 12 5s-3.4 0-6.2.1c-.4 0-1.2 0-2 .9C3.2 6.6 3 8 3 8s-.2 1.7-.2 3.4v1.6c0 1.7.2 3.4.2 3.4s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.7.1 6.8.1 6.8.1s3.4 0 6.2-.1c.4 0 1.2 0 2-.9.6-.6.8-2 .8-2s.2-1.7.2-3.4v-1.6C21.2 9.7 21 8 21 8zm-11 7V9l5 3-5 3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============ PLACEHOLDER ============
export function Placeholder({
  label,
  dark = false,
  style,
}: {
  label: string;
  dark?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`ph ${dark ? "ph--dark" : ""}`} style={style}>
      <span className="ph__label">{label}</span>
    </div>
  );
}

// ============ HERO BG ============
export function HeroBg() {
  const [particles] = useState(() =>
    Array.from({ length: 20 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 12}s`,
      animationDelay: `${Math.random() * 10}s`,
      background: i % 3 === 0 ? "var(--c-accent)" : "rgba(255,255,255,0.5)",
    }))
  );

  return (
    <div className="hero__bg">
      <div className="pitch-scene" />
      <div className="pitch-lines">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="none">
          <g stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none">
            <rect x="100" y="100" width="1400" height="700" />
            <line x1="800" y1="100" x2="800" y2="800" />
            <circle cx="800" cy="450" r="90" />
            <rect x="100" y="280" width="200" height="340" />
            <rect x="1300" y="280" width="200" height="340" />
            <rect x="100" y="370" width="80" height="160" />
            <rect x="1420" y="370" width="80" height="160" />
          </g>
        </svg>
      </div>
      <div className="particles">
        {particles.map((p, i) => (
          <span key={i} className="particle" style={p} />
        ))}
      </div>
      <div className="hero__marquee">
        <div className="hero__marquee-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>Alcainça · AC · 1950 · </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ COUNTDOWN HOOK ============
export function useCountdown(targetDate: number) {
  const [t, setT] = useState<number>(0);

  useEffect(() => {
    // Só corre no cliente para evitar mismatches de hidratação
    const tick = () => setT(Math.max(0, targetDate - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const s = Math.floor(t / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

// ============ CLUB DATA (FPF + static.json) ============
export type ClubFpf = {
  _meta?: { last_updated?: string };
  competition?: { name?: string; serie?: string; association?: string; season?: string };
  team?: { name?: string };
  standings?: Array<{
    pos: number;
    team: string;
    played: number;
    wins: number;
    draws: number;
    losses: number;
    gf: number;
    ga: number;
    points: number;
  }>;
  matches?: {
    played?: Array<{ home: string; away: string; homeGoals: number | null; awayGoals: number | null; date: string; venue?: string; played: boolean }>;
    upcoming?: Array<{ home: string; away: string; date: string; venue?: string }>;
  };
  stats?: {
    position: number | null;
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goals_for: number;
    goals_against: number;
    points: number;
    form: string[];
  };
  next_match?: { home: string; away: string; date: string; venue?: string } | null;
  last_match?: { home: string; away: string; homeGoals: number | null; awayGoals: number | null; date: string } | null;
};

export type ClubStatic = {
  club?: {
    name: string;
    short: string;
    founded: string;
    address: string;
    email: string;
    phone: string;
    social: { facebook?: string; instagram?: string };
  };
  values?: Array<{ title: string; desc: string }>;
  history_timeline?: Array<{ year: string; title: string; desc: string; badge: string }>;
  patinagem?: {
    niveis?: Array<{ nome: string; idade: string; desc: string }>;
    horarios?: Array<{ dia: string; slots: string[] }>;
  };
};

export type ClubData = {
  fpf: ClubFpf | null;
  static: ClubStatic | null;
  loading: boolean;
};

export function useClubData(): ClubData {
  const [data, setData] = useState<ClubData>({ fpf: null, static: null, loading: true });

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch("/data/alcainca.json")
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch("/data/static.json")
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ]).then(([fpf, stat]) => {
      if (cancelled) return;
      setData({ fpf, static: stat, loading: false });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}

// Helper: parse FPF date "DD mmm" ex: "29 mar"
export function useParsedFpfDate(raw?: string | null) {
  return useMemo(() => {
    if (!raw) return null;
    const months: Record<string, number> = {
      jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5,
      jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11,
    };
    const m = String(raw).toLowerCase().match(/(\d{1,2})\s+(\w{3})/);
    if (!m) return null;
    const d = new Date();
    d.setMonth(months[m[2]] ?? d.getMonth(), parseInt(m[1], 10));
    d.setHours(16, 0, 0, 0);
    if (d < new Date()) d.setFullYear(d.getFullYear() + 1);
    return d;
  }, [raw]);
}
