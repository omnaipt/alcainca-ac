export const dynamic = "force-dynamic";

import Link from "next/link";
import { getEventosDestaque, getTipoBadgeClass } from "@/lib/eventos";

const MONTHS_PT: Record<string, string> = {
  "01": "Jan", "02": "Fev", "03": "Mar", "04": "Abr",
  "05": "Mai", "06": "Jun", "07": "Jul", "08": "Ago",
  "09": "Set", "10": "Out", "11": "Nov", "12": "Dez",
};

function formatDatePT(iso: string) {
  const [, m, d] = iso.split("-");
  return `${d} ${MONTHS_PT[m]}`;
}

export default async function Home() {
  const eventosDestaque = await getEventosDestaque(3);
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-0 right-0 w-2 h-full gradient-gold opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up mt-12 md:mt-16">
            <img
              src="/images/logo.png"
              alt="Alcainça Atlético Clube"
              className="w-28 h-32 md:w-36 md:h-40 object-contain mx-auto mb-6 drop-shadow-2xl"
            />
          </div>
          <h1 className="font-[var(--font-display)] text-6xl md:text-8xl lg:text-9xl tracking-wider text-foreground leading-none mb-4 animate-slide-up animation-delay-200">
            ALCAINÇA
            <br />
            <span className="text-gradient-gold">ATLÉTICO CLUBE</span>
          </h1>
          <p className="font-[var(--font-display)] text-gold text-2xl md:text-3xl tracking-widest mb-4 animate-slide-up animation-delay-400">
            DESDE 6 DE ABRIL DE 1950
          </p>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 animate-slide-up animation-delay-500">
            76 anos ao serviço do desporto e da comunidade de Alcainça
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-600">
            <Link
              href="/historia"
              className="gradient-gold text-background font-bold px-8 py-4 rounded-lg text-lg tracking-wide hover:scale-105 transition-transform duration-200 uppercase"
            >
              Conhecer o Clube
            </Link>
            <Link
              href="/contactos"
              className="border-2 border-gold text-gold font-bold px-8 py-4 rounded-lg text-lg tracking-wide hover:bg-gold hover:text-background transition-all duration-200 uppercase"
            >
              Contacte-nos
            </Link>
          </div>
        </div>

        {/* Bottom diagonal cut */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-background" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>

      {/* Modalidades */}
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[var(--font-display)] text-5xl md:text-7xl tracking-wider text-foreground mb-4">
              AS NOSSAS <span className="text-gradient-gold">MODALIDADES</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Duas modalidades que representam a paixão e dedicação do nosso clube
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Futebol */}
            <Link href="/modalidades/futebol" className="group">
              <div className="relative bg-gradient-to-br from-secondary to-navy rounded-2xl p-8 border border-border overflow-hidden hover:border-gold/50 transition-all duration-300">
                <div className="absolute inset-0 sport-stripe opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">⚽</span>
                  </div>
                  <h3 className="font-[var(--font-display)] text-3xl tracking-wider text-foreground mb-3">FUTEBOL</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    A modalidade rainha do clube. A equipa sénior compete na III Divisão da AF Lisboa com garra e determinação.
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all duration-200 uppercase text-sm tracking-wide">
                    Saber mais <span>&rarr;</span>
                  </span>
                </div>
              </div>
            </Link>

            {/* Patinagem */}
            <Link href="/modalidades/patinagem" className="group">
              <div className="relative bg-gradient-to-br from-gold/20 to-secondary rounded-2xl p-8 border border-border overflow-hidden hover:border-gold/50 transition-all duration-300">
                <div className="absolute inset-0 sport-stripe opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🛼</span>
                  </div>
                  <h3 className="font-[var(--font-display)] text-3xl tracking-wider text-foreground mb-3">PATINAGEM ARTÍSTICA</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Elegância e técnica em cada apresentação. A nossa secção forma atletas de excelência com paixão pelo desporto.
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all duration-200 uppercase text-sm tracking-wide">
                    Saber mais <span>&rarr;</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Próximos Eventos */}
      <section className="py-24 bg-card relative">
        <div className="absolute top-0 left-0 right-0 h-16 bg-background" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="text-center mb-16">
            <h2 className="font-[var(--font-display)] text-5xl md:text-7xl tracking-wider text-foreground mb-4">
              PRÓXIMOS <span className="text-gradient-gold">EVENTOS</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Acompanhe os próximos jogos e eventos do clube
            </p>
          </div>
          <div className="space-y-6">
            {eventosDestaque.map((evento) => {
              const [, m, d] = evento.data.split("-");
              const monthName = MONTHS_PT[m]?.toUpperCase() || "";
              return (
                <div
                  key={evento.id}
                  className="bg-secondary/50 border border-border rounded-xl overflow-hidden hover:border-gold/40 transition-colors group"
                >
                  {evento.imagem && (
                    <div className="w-full max-h-44 md:max-h-52 overflow-hidden">
                      <img src={evento.imagem} alt={evento.titulo} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0 w-20 h-20 gradient-gold rounded-xl flex flex-col items-center justify-center group-hover:scale-105 transition-transform">
                      <span className="font-[var(--font-display)] text-2xl text-background leading-none">{d}</span>
                      <span className="text-xs font-bold text-background/80 uppercase">{monthName}</span>
                    </div>
                    <div className="flex-1">
                      <span className="inline-block text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                        {evento.tipo}
                      </span>
                      <h3 className="font-[var(--font-display)] text-xl tracking-wide text-foreground mb-2">{evento.titulo}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          {evento.local}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {evento.hora}
                        </span>
                      </div>
                      {evento.marcacaoObrigatoria && (
                        <span className="inline-block mt-2 text-xs text-accent font-semibold">Marcação obrigatória</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/calendario"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all uppercase tracking-wide"
            >
              Ver calendário completo &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Últimas Notícias */}
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[var(--font-display)] text-5xl md:text-7xl tracking-wider text-foreground mb-4">
              ÚLTIMAS <span className="text-gradient-gold">NOTÍCIAS</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Novo site do Alcainça AC",
                date: "MARÇO 2026",
                desc: "O Alcainça Atlético Clube apresenta o seu novo site oficial, onde poderá acompanhar todas as novidades do clube.",
              },
              {
                title: "Inscrições abertas",
                date: "EM BREVE",
                desc: "Fique atento às inscrições para a nova temporada nas modalidades de futebol e patinagem artística.",
              },
              {
                title: "76 anos de história",
                date: "ABRIL 2026",
                desc: "O Alcainça AC prepara-se para celebrar 76 anos ao serviço da comunidade e do desporto.",
              },
            ].map((news, i) => (
              <article
                key={i}
                className="bg-card border border-border rounded-xl overflow-hidden group hover:border-gold/40 transition-all duration-300"
              >
                <div className="h-1 gradient-gold w-0 group-hover:w-full transition-all duration-500" />
                <div className="p-6">
                  <span className="text-xs font-bold text-gold uppercase tracking-widest">{news.date}</span>
                  <h3 className="font-[var(--font-display)] text-2xl tracking-wide text-foreground mt-2 mb-3">{news.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{news.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all uppercase tracking-wide"
            >
              Todas as notícias &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-gold" />
        <div className="absolute inset-0 sport-stripe opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl tracking-wider text-background mb-6">
            JUNTA-TE AO ALCAINÇA AC
          </h2>
          <p className="text-background/80 text-lg max-w-lg mx-auto mb-10">
            Faz parte da família do Alcainça Atlético Clube. Inscreve-te como sócio ou atleta.
          </p>
          <Link
            href="/contactos"
            className="inline-block bg-background text-foreground font-bold px-10 py-4 rounded-lg text-lg tracking-wide hover:scale-105 transition-transform duration-200 uppercase"
          >
            Inscrever-me
          </Link>
        </div>
      </section>
    </>
  );
}
