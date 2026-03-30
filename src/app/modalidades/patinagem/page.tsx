import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Patinagem Artística",
  description: "Secção de Patinagem Artística do Alcainça Atlético Clube. Atletas, competições e inscrições.",
};

export default function Patinagem() {
  return (
    <>
      {/* Header */}
      <section className="gradient-navy py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 sport-stripe opacity-5" />
        <div className="absolute top-0 right-0 text-[200px] opacity-5 font-black leading-none select-none">🛼</div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-muted-foreground hover:text-gold text-sm transition-colors">Início</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-gold text-sm">Patinagem Artística</span>
          </div>
          <h1 className="font-[var(--font-display)] text-5xl md:text-7xl tracking-wider text-foreground mb-4">
            <span className="text-gradient-gold">PATINAGEM ARTÍSTICA</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Elegância, técnica e paixão. A nossa secção de patinagem artística forma atletas de excelência.
          </p>
          <div className="flex gap-4 mt-6">
            <Link href="/contactos" className="gradient-gold text-background font-bold px-6 py-3 rounded-lg tracking-wide hover:scale-105 transition-transform uppercase text-sm">
              Inscrever-me
            </Link>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="font-[var(--font-display)] text-3xl tracking-wider text-foreground mb-4">SOBRE A SECÇÃO</h2>
            <p className="text-muted-foreground leading-relaxed">
              A secção de patinagem artística do Alcainça Atlético Clube é sinónimo de dedicação e talento.
              Com treinos regulares e participação em competições regionais e nacionais, os nossos atletas
              desenvolvem as suas capacidades num ambiente de excelência. Promovemos os valores do desporto
              e a disciplina necessária para alcançar grandes resultados.
            </p>
          </div>
        </div>
      </section>

      {/* Escalões */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[var(--font-display)] text-4xl tracking-wider text-foreground text-center mb-10">
            NÍVEIS DE <span className="text-gradient-gold">FORMAÇÃO</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
            {[
              { nome: "Iniciação A", desc: "Primeiros passos na patinagem artística" },
              { nome: "Iniciação B", desc: "Consolidação das bases técnicas" },
              { nome: "Pré-Competição A", desc: "Preparação para a competição" },
              { nome: "Pré-Competição B", desc: "Transição para o nível competitivo" },
              { nome: "Competição", desc: "Competição regional e nacional" },
            ].map((nivel, i) => (
              <div key={i} className="bg-secondary/50 border border-border rounded-xl p-6 text-center hover:border-gold/40 transition-colors">
                <div className="w-12 h-12 mx-auto gradient-gold rounded-full flex items-center justify-center mb-4">
                  <span className="font-[var(--font-display)] text-xl text-background">{i + 1}</span>
                </div>
                <h3 className="font-[var(--font-display)] text-lg tracking-wider text-foreground mb-1">{nivel.nome}</h3>
                <p className="text-muted-foreground text-xs mt-2">{nivel.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Horários */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[var(--font-display)] text-4xl tracking-wider text-foreground text-center mb-2">
            HORÁRIOS DE <span className="text-gradient-gold">TREINO</span>
          </h2>
          <p className="text-muted-foreground text-sm text-center mb-8">Época 2025/2026</p>

          <div className="space-y-4 mb-6">
            {[
              {
                day: "Segunda",
                sessions: [
                  { time: "17:30 – 18:30", group: "Pré-Competição B e Competição", note: "Livres" },
                ],
              },
              {
                day: "Terça",
                sessions: [
                  { time: "17:30 – 18:15", group: "Iniciação A", note: "" },
                  { time: "18:00 – 19:00", group: "Iniciação B", note: "" },
                  { time: "19:00 – 20:30", group: "Pré-Competição A", note: "" },
                ],
              },
              {
                day: "Quarta",
                sessions: [
                  { time: "17:30 – 19:15", group: "Pré-Competição B", note: "Solo Dance" },
                  { time: "18:30 – 20:30", group: "Competição", note: "Solo Dance" },
                ],
              },
              {
                day: "Quinta",
                sessions: [
                  { time: "17:30 – 18:15", group: "Iniciação A", note: "" },
                  { time: "18:15 – 19:00", group: "Iniciação B", note: "" },
                  { time: "19:00 – 20:30", group: "Pré-Competição A", note: "" },
                ],
              },
              {
                day: "Sexta",
                sessions: [
                  { time: "17:30 – 18:30", group: "Pré-Competição B", note: "Livres" },
                  { time: "18:30 – 20:30", group: "Competição", note: "Livres" },
                ],
              },
            ].map((day) => (
              <div key={day.day} className="rounded-xl border border-border overflow-hidden">
                <div className="gradient-gold px-5 py-3">
                  <h3 className="font-[var(--font-display)] text-lg tracking-wider text-background">{day.day.toUpperCase()}</h3>
                </div>
                <div className="divide-y divide-border">
                  {day.sessions.map((session) => (
                    <div key={session.time + session.group} className="px-5 py-3 flex items-center gap-4">
                      <span className="text-sm font-semibold text-gold min-w-[130px]">{session.time}</span>
                      <span className="text-sm text-foreground flex-1">{session.group}</span>
                      {session.note && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{session.note}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sábado - dois grupos */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                day: "Sábado · Grupo 1",
                sessions: [
                  { time: "9:00 – 10:00", group: "Competição e Pré-Comp. B", note: "Treino s/ Patins" },
                  { time: "10:00 – 11:00", group: "Pré-Competição B", note: "Solo Dance" },
                  { time: "11:00 – 12:00", group: "Competição", note: "Solo Dance" },
                ],
              },
              {
                day: "Sábado · Grupo 2",
                sessions: [
                  { time: "9:00 – 10:00", group: "Pré-Competição A", note: "Solo Dance" },
                  { time: "10:00 – 11:00", group: "Pré-Competição A", note: "Treino s/ Patins" },
                  { time: "11:00 – 12:00", group: "Iniciação B", note: "Treino s/ Patins" },
                  { time: "12:00 – 13:00", group: "Iniciação B", note: "Solo Dance" },
                ],
              },
            ].map((group) => (
              <div key={group.day} className="rounded-xl border border-border overflow-hidden">
                <div className="gradient-gold px-5 py-3">
                  <h3 className="font-[var(--font-display)] text-base tracking-wider text-background">{group.day.toUpperCase()}</h3>
                </div>
                <div className="divide-y divide-border">
                  {group.sessions.map((session) => (
                    <div key={session.time + session.group} className="px-5 py-3">
                      <span className="text-sm font-semibold text-gold block mb-1">{session.time}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground">{session.group}</span>
                        {session.note && (
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{session.note}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-gold" />
        <div className="absolute inset-0 sport-stripe opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[var(--font-display)] text-4xl md:text-6xl tracking-wider text-background mb-4">
            EXPERIMENTA A PATINAGEM ARTÍSTICA
          </h2>
          <p className="text-background/80 mb-6">
            Aceitas o desafio? Vem experimentar uma aula gratuita e descobre o mundo da patinagem artística.
          </p>
          <Link
            href="/contactos"
            className="inline-block bg-background text-foreground font-bold px-10 py-4 rounded-lg text-lg tracking-wide hover:scale-105 transition-transform duration-200 uppercase"
          >
            Agendar Aula Experimental
          </Link>
        </div>
      </section>
    </>
  );
}
