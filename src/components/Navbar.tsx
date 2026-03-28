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
    <nav className="bg-navy text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <img src="/images/logo.png" alt="Alcainça AC" className="h-12 w-auto" />
            <div className="hidden sm:block">
              <span className="font-bold text-lg leading-tight">Alcainça AC</span>
              <span className="block text-xs text-gold opacity-80">Desde 1950</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="px-3 py-2 rounded-md text-sm font-medium hover:bg-navy-light transition-colors">
                    {link.label}
                    <svg className="inline-block ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 bg-navy-light rounded-md shadow-xl py-1 min-w-[200px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm hover:bg-navy transition-colors"
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
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-navy-light transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-navy-light transition-colors"
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
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy-dark border-t border-navy-light">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <span className="block px-3 py-2 text-xs font-semibold text-gold uppercase tracking-wider">
                    {link.label}
                  </span>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block pl-6 pr-3 py-2 text-sm hover:bg-navy-light rounded-md transition-colors"
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
                  className="block px-3 py-2 text-sm hover:bg-navy-light rounded-md transition-colors"
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
