import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Futebol",
  description: "Secção de Futebol do Alcainça Atlético Clube. AF Lisboa III Divisão Série 1.",
};

export default function Futebol() {
  return (
    <>
      {/* Header */}
      <section className="gradient-navy py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 sport-stripe opacity-5" />
        <div className="absolute top-0 right-0 text-[200px] opacity-5 font-black leading-none select-none">⚽</div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-muted-foreground hover:text-gold text-sm transition-colors">Início</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-gold text-sm">Futebol</span>
          </div>
          <h1 className="font-[var(--font-display)] text-5xl md:text-7xl tracking-wider text-foreground mb-4">
            <span className="text-gradient-gold">FUTEBOL</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            AF Lisboa III Divisão Série 1 &middot; Época 2025/26
          </p>
        </div>
      </section>

      {/* Sobre */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-[var(--font-display)] text-3xl tracking-wider text-foreground mb-6">SOBRE A SECÇÃO</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                A secção de futebol do Alcainça Atlético Clube é a espinha dorsal do clube desde a sua
                fundação em 1950. Ao longo de mais de sete décadas, centenas de jogadores
                vestiram as nossas cores com orgulho.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Contamos com uma equipa de <strong className="text-foreground">futebol sénior</strong> que compete na{" "}
                <strong className="text-foreground">III Divisão Série 1 da AF Lisboa</strong>,
                enfrentando equipas da região de Lisboa Oeste com garra e determinação.
              </p>
              <div className="flex gap-4 mt-6">
                <Link
                  href="/contactos"
                  className="gradient-gold text-background font-bold px-6 py-3 rounded-lg hover:scale-105 transition-transform uppercase tracking-wide text-sm"
                >
                  Inscrever-me
                </Link>
                <Link
                  href="/calendario"
                  className="border-2 border-gold text-gold font-bold px-6 py-3 rounded-lg hover:bg-gold hover:text-background transition-all uppercase tracking-wide text-sm"
                >
                  Ver Calendário
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-secondary to-navy rounded-2xl p-8 flex items-center justify-center border border-border">
              <img src="/images/logo.png" alt="Futebol Alcainça AC" className="h-40 w-auto opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Temporada Atual */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[var(--font-display)] text-4xl tracking-wider text-foreground text-center mb-2">
            TEMPORADA <span className="text-gradient-gold">2025/26</span>
          </h2>
          <p className="text-muted-foreground text-center mb-10">AF Lisboa III Divisão Série 1</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center max-w-3xl mx-auto">
            <div className="bg-background border border-border rounded-xl p-5">
              <span className="block text-3xl font-[var(--font-display)] text-foreground">25</span>
              <span className="text-sm text-muted-foreground">Jogos</span>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
              <span className="block text-3xl font-[var(--font-display)] text-green-400">11</span>
              <span className="text-sm text-muted-foreground">Vitórias</span>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5">
              <span className="block text-3xl font-[var(--font-display)] text-yellow-400">3</span>
              <span className="text-sm text-muted-foreground">Empates</span>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
              <span className="block text-3xl font-[var(--font-display)] text-red-400">11</span>
              <span className="text-sm text-muted-foreground">Derrotas</span>
            </div>
            <div className="bg-gold/10 border border-gold/30 rounded-xl p-5 col-span-2 md:col-span-1">
              <span className="block text-3xl font-[var(--font-display)] text-gold">46-47</span>
              <span className="text-sm text-muted-foreground">Golos M/S</span>
            </div>
          </div>

          {/* Últimos resultados */}
          <div className="mt-10 max-w-2xl mx-auto">
            <h3 className="font-[var(--font-display)] text-lg tracking-wider text-foreground mb-4 text-center">ÚLTIMOS 5 JOGOS</h3>
            <div className="flex justify-center gap-2">
              {[
                { r: "D", cor: "bg-red-500" },
                { r: "V", cor: "bg-green-500" },
                { r: "V", cor: "bg-green-500" },
                { r: "D", cor: "bg-red-500" },
                { r: "D", cor: "bg-red-500" },
              ].map((j, i) => (
                <span key={i} className={`w-10 h-10 rounded-full ${j.cor} text-white flex items-center justify-center font-bold text-sm`}>
                  {j.r}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/calendario"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all uppercase tracking-wide"
            >
              Ver calendário completo &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Próximo Jogo */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[var(--font-display)] text-3xl tracking-wider text-foreground text-center mb-8">PRÓXIMO JOGO</h2>
          <div className="bg-gradient-to-br from-secondary to-navy rounded-2xl p-8 text-center border border-border">
            <span className="text-sm text-gold font-medium uppercase tracking-wider">III Divisão Série 1 &middot; Jornada 9</span>
            <div className="flex items-center justify-center gap-6 md:gap-12 my-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🏠</span>
                </div>
                <span className="font-bold text-foreground">Sobreirense</span>
              </div>
              <div>
                <span className="text-3xl font-[var(--font-display)] text-gold">VS</span>
                <span className="block text-sm text-muted-foreground mt-1">29 Mar 2026</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <img src="/images/logo.png" alt="Alcainça AC" className="h-10 w-auto" />
                </div>
                <span className="font-bold text-foreground">Alcainça AC</span>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">Fora</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-gold" />
        <div className="absolute inset-0 sport-stripe opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[var(--font-display)] text-4xl md:text-6xl tracking-wider text-background mb-4">
            QUERES JOGAR NO ALCAINÇA AC?
          </h2>
          <p className="text-background/80 mb-8">
            Estamos sempre à procura de novos talentos. Contacta-nos para saber mais sobre inscrições.
          </p>
          <Link
            href="/contactos"
            className="inline-block bg-background text-foreground font-bold px-10 py-4 rounded-lg text-lg tracking-wide hover:scale-105 transition-transform duration-200 uppercase"
          >
            Contactar
          </Link>
        </div>
      </section>
    </>
  );
}
