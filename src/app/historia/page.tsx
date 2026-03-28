import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "História",
  description: "A história do Alcainça Atlético Clube, fundado em 6 de Abril de 1950.",
};

export default function Historia() {
  const marcos = [
    { ano: "1950", titulo: "Fundação", desc: "O Alcainça Atlético Clube é fundado a 6 de Abril de 1950, nascendo da paixão da comunidade pelo desporto." },
    { ano: "Anos 60-70", titulo: "Primeiros Passos", desc: "Os primeiros anos do clube são marcados pelo crescimento e pela consolidação no panorama desportivo local." },
    { ano: "Anos 80-90", titulo: "Crescimento", desc: "O clube expande as suas instalações e reforça a formação de jovens atletas." },
    { ano: "Anos 2000", titulo: "Novas Modalidades", desc: "Para além do futebol, o clube alarga a sua oferta desportiva com a patinagem artística." },
    { ano: "Presente", titulo: "Tradição e Futuro", desc: "Com 76 anos de história, o Alcainça AC continua a ser um pilar da comunidade, formando atletas e promovendo o desporto." },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">A Nossa História</h1>
          <p className="text-xl text-gold">76 anos de paixão pelo desporto</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">
              O <strong>Alcainça Atlético Clube</strong> foi fundado a <strong>6 de Abril de 1950</strong>,
              na localidade de Alcainça, concelho de Mafra. Desde a sua fundação, o clube tem sido um
              símbolo de união e dedicação ao desporto, servindo a comunidade local e formando
              gerações de atletas.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Com duas modalidades de destaque — <strong>futebol</strong> e <strong>patinagem artística</strong> —
              o Alcainça AC continua a crescer e a inspirar novos atletas, mantendo vivos os valores
              de companheirismo, esforço e paixão que marcam a sua história.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Marcos Históricos</h2>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-navy/20 transform md:-translate-x-0.5" />

            {marcos.map((marco, i) => (
              <div key={i} className={`relative flex items-start mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full border-4 border-white shadow transform -translate-x-2 md:-translate-x-2 mt-1.5 z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="inline-block text-sm font-bold text-gold bg-navy px-3 py-1 rounded-full mb-2">
                    {marco.ano}
                  </span>
                  <h3 className="text-xl font-bold text-navy">{marco.titulo}</h3>
                  <p className="text-gray-600 mt-1">{marco.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Os Nossos Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { titulo: "Comunidade", desc: "Servimos a comunidade de Alcainça, promovendo a inclusão social através do desporto.", icon: "🤝" },
              { titulo: "Formação", desc: "Investimos na formação de jovens atletas, preparando-os para o futuro dentro e fora do campo.", icon: "🌱" },
              { titulo: "Excelência", desc: "Procuramos a excelência em tudo o que fazemos, com dedicação e trabalho de equipa.", icon: "⭐" },
            ].map((valor, i) => (
              <div key={i} className="text-center p-8 rounded-xl bg-gray-50">
                <span className="text-4xl mb-4 block">{valor.icon}</span>
                <h3 className="text-xl font-bold text-navy mb-2">{valor.titulo}</h3>
                <p className="text-gray-600">{valor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
