import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Últimas notícias do Alcainça Atlético Clube.",
};

const noticias = [
  {
    titulo: "Novo site oficial do Alcainça AC",
    data: "Março 2026",
    categoria: "Clube",
    resumo: "O Alcainça Atlético Clube apresenta o seu novo site oficial. Aqui poderá acompanhar todas as novidades, calendário de jogos, informações sobre as modalidades e muito mais.",
  },
  {
    titulo: "Inscrições abertas para a nova temporada",
    data: "Em breve",
    categoria: "Inscrições",
    resumo: "Esteja atento! Em breve abriremos as inscrições para a nova temporada nas modalidades de futebol e patinagem artística. Não perca a oportunidade de fazer parte da nossa equipa.",
  },
  {
    titulo: "mais de 75 anos de história e paixão",
    data: "Abril 2026",
    categoria: "Clube",
    resumo: "O Alcainça AC prepara-se para celebrar o seu 76.º aniversário a 6 de Abril de 2026. Sete décadas ao serviço da comunidade de Alcainça e do desporto.",
  },
];

export default function Noticias() {
  return (
    <>
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Notícias</h1>
          <p className="text-xl text-gray-300">As últimas novidades do Alcainça AC</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {noticias.map((noticia, i) => (
              <article
                key={i}
                className="group rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="md:flex">
                  <div className="md:w-64 h-48 md:h-auto bg-gradient-to-br from-navy to-navy-light flex items-center justify-center shrink-0">
                    <img src="/images/logo.png" alt="" className="h-16 w-auto opacity-20" />
                  </div>
                  <div className="p-6 md:p-8 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold/20 text-gold-dark">
                        {noticia.categoria}
                      </span>
                      <span className="text-sm text-gray-400">{noticia.data}</span>
                    </div>
                    <h2 className="text-xl font-bold text-navy mb-2 group-hover:text-gold-dark transition-colors">
                      {noticia.titulo}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">{noticia.resumo}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
