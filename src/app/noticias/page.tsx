import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Últimas notícias do Alcainça Atlético Clube.",
};

const noticias = [
  {
    titulo: "Novo site oficial do Alcainça AC",
    data: "MARÇO 2026",
    categoria: "Clube",
    resumo: "O Alcainça Atlético Clube apresenta o seu novo site oficial. Aqui poderá acompanhar todas as novidades, calendário de jogos, informações sobre as modalidades e muito mais.",
  },
  {
    titulo: "Inscrições abertas para a nova temporada",
    data: "EM BREVE",
    categoria: "Inscrições",
    resumo: "Esteja atento! Em breve abriremos as inscrições para a nova temporada nas modalidades de futebol e patinagem artística. Não perca a oportunidade de fazer parte da nossa equipa.",
  },
  {
    titulo: "76 anos de história e paixão",
    data: "ABRIL 2026",
    categoria: "Clube",
    resumo: "O Alcainça AC prepara-se para celebrar o seu 76.º aniversário a 6 de Abril de 2026. Sete décadas ao serviço da comunidade de Alcainça e do desporto.",
  },
];

export default function Noticias() {
  return (
    <>
      <section className="gradient-navy py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 sport-stripe opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[var(--font-display)] text-5xl md:text-7xl tracking-wider text-foreground mb-4">
            <span className="text-gradient-gold">NOTÍCIAS</span>
          </h1>
          <p className="text-muted-foreground text-lg">As últimas novidades do Alcainça AC</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {noticias.map((noticia, i) => (
              <article
                key={i}
                className="bg-card border border-border rounded-xl overflow-hidden group hover:border-gold/40 transition-all duration-300"
              >
                <div className="h-1 gradient-gold w-0 group-hover:w-full transition-all duration-500" />
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      {noticia.categoria}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{noticia.data}</span>
                  </div>
                  <h2 className="font-[var(--font-display)] text-2xl tracking-wide text-foreground mb-3 group-hover:text-gold transition-colors">
                    {noticia.titulo}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{noticia.resumo}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
