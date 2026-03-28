import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-light opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="text-center">
            <img
              src="/images/logo.png"
              alt="Alcainça Atlético Clube"
              className="h-32 md:h-40 w-auto mx-auto mb-8 drop-shadow-2xl"
            />
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Alcainça Atlético Clube
            </h1>
            <p className="text-xl md:text-2xl text-gold font-medium mb-2">
              Desde 6 de Abril de 1950
            </p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              mais de 75 anos ao serviço do desporto e da comunidade de Alcainça
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/historia"
                className="inline-flex items-center justify-center px-8 py-3 bg-gold text-navy font-bold rounded-lg hover:bg-gold-light transition-colors"
              >
                Conhecer o Clube
              </Link>
              <Link
                href="/contactos"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-navy transition-colors"
              >
                Contacte-nos
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Modalidades */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">As Nossas Modalidades</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Duas modalidades que representam a paixão e dedicação do nosso clube
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Futebol */}
            <Link href="/modalidades/futebol" className="group">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-navy to-navy-light p-8 md:p-10 text-white h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute top-4 right-4 text-6xl opacity-20">⚽</div>
                <div className="relative">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Futebol</h3>
                  <p className="text-gray-300 mb-6">
                    A modalidade rainha do clube. A equipa sénior compete na III Divisão da AF Lisboa
                    com garra e determinação.
                  </p>
                  <span className="inline-flex items-center text-gold font-semibold group-hover:gap-3 gap-2 transition-all">
                    Saber mais
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>

            {/* Patinagem */}
            <Link href="/modalidades/patinagem" className="group">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gold-dark to-gold p-8 md:p-10 text-navy h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute top-4 right-4 text-6xl opacity-20">🛼</div>
                <div className="relative">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Patinagem Artística</h3>
                  <p className="text-navy-light mb-6">
                    Elegância e técnica em cada apresentação. A nossa secção de patinagem artística
                    forma atletas de excelência com paixão pelo desporto.
                  </p>
                  <span className="inline-flex items-center text-navy font-semibold group-hover:gap-3 gap-2 transition-all">
                    Saber mais
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Próximos Eventos */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Próximos Eventos</h2>
            <p className="text-gray-600">Acompanhe os próximos jogos e eventos do clube</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                date: "29 Mar 2026",
                title: "Sobreirense vs Alcainça AC",
                desc: "III Divisão Série 1 - Jornada 9 (Fora)",
                type: "Futebol",
              },
              {
                date: "30 Mar 2026",
                title: "Assembleia Geral Ordinária",
                desc: "Pavilhão do AAC às 21h. Convocatória disponível na página do calendário.",
                type: "Sócios",
              },
              {
                date: "Dom. 15:30",
                title: "Baile de Domingo",
                desc: "Todos os domingos às 15:30 na sede do clube",
                type: "Baile",
              },
              {
                date: "18 Abr 2026",
                title: "Jantar 76.º Aniversário",
                desc: "Jantar comemorativo às 19h30 na sede. Marcação obrigatória.",
                type: "Evento",
              },
            ].map((event, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-navy/10 text-navy">
                    {event.type}
                  </span>
                  <span className="text-sm text-gray-500">{event.date}</span>
                </div>
                <h3 className="font-bold text-lg text-navy mb-1">{event.title}</h3>
                <p className="text-gray-600 text-sm">{event.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/calendario"
              className="inline-flex items-center gap-2 text-navy font-semibold hover:text-gold transition-colors"
            >
              Ver calendário completo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Últimas Notícias */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Últimas Notícias</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Novo site do Alcainça AC",
                date: "Março 2026",
                desc: "O Alcainça Atlético Clube apresenta o seu novo site oficial, onde poderá acompanhar todas as novidades do clube.",
              },
              {
                title: "Inscrições abertas",
                date: "Em breve",
                desc: "Fique atento às inscrições para a nova temporada nas modalidades de futebol e patinagem artística.",
              },
              {
                title: "mais de 75 anos de história",
                date: "Abril 2026",
                desc: "O Alcainça AC prepara-se para celebrar mais de 75 anos ao serviço da comunidade e do desporto.",
              },
            ].map((news, i) => (
              <article
                key={i}
                className="rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
                  <img src="/images/logo.png" alt="" className="h-20 w-auto opacity-30" />
                </div>
                <div className="p-6">
                  <span className="text-xs text-gray-500">{news.date}</span>
                  <h3 className="font-bold text-navy mt-1 mb-2">{news.title}</h3>
                  <p className="text-sm text-gray-600">{news.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 text-navy font-semibold hover:text-gold transition-colors"
            >
              Todas as notícias
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Junta-te ao Alcainça AC</h2>
          <p className="text-lg text-gray-300 mb-8">
            Faz parte da família do Alcainça Atlético Clube. Inscreve-te como sócio ou atleta.
          </p>
          <Link
            href="/contactos"
            className="inline-flex items-center justify-center px-8 py-3 bg-gold text-navy font-bold rounded-lg hover:bg-gold-light transition-colors"
          >
            Inscrever-me
          </Link>
        </div>
      </section>
    </>
  );
}
