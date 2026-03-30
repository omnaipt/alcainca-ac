"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/historia", label: "História" },
  {
    label: "Modalidades",
    children: [
      { href: "/modalidades/futebol", label: "Futebol" },
      { href: "/modalidades/patinagem", label: "Patinagem Artística" },
    ],
  },
  { href: "/calendario", label: "Calendário" },
  { href: "/noticias", label: "Notícias" },
  { href: "/galeria", label: "Galeria" },
  { href: "/contactos", label: "Contactos" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img src="/images/logo.png" alt="Alcainça AC" className="w-10 h-12 object-contain" />
          <div className="text-left">
            <span className="font-[var(--font-display)] text-xl tracking-wider text-foreground">ALCAINÇA AC</span>
            <span className="block text-xs text-gold tracking-widest">DESDE 1950</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="text-sm font-medium text-muted-foreground hover:text-gold transition-colors duration-200 tracking-wide uppercase">
                  {link.label}
                  <svg className="inline-block ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 bg-card border border-border rounded-lg shadow-xl py-1 min-w-[200px] mt-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-gold hover:bg-secondary transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-gold transition-colors duration-200 tracking-wide uppercase"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-b border-border">
          <div className="flex flex-col p-4 gap-3">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <span className="block px-3 py-1 text-xs font-semibold text-gold uppercase tracking-widest">
                    {link.label}
                  </span>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block pl-6 pr-3 py-2 text-sm text-muted-foreground hover:text-gold transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-gold transition-colors uppercase tracking-wide"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
