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
      <section className="bg-navy text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[200px] opacity-5 font-black leading-none select-none">⚽</div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Início</Link>
            <span className="text-gray-500">/</span>
            <span className="text-gold text-sm">Futebol</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Futebol</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            AF Lisboa III Divisão Série 1 &middot; Época 2025/26
          </p>
        </div>
      </section>

      {/* Sobre */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">Sobre a Secção de Futebol</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                A secção de futebol do Alcainça Atlético Clube é a espinha dorsal do clube desde a sua
                fundação em 1950. Ao longo de mais de sete décadas, centenas de jogadores
                vestiram as nossas cores com orgulho.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Contamos com uma equipa de <strong>futebol sénior</strong> que compete na{" "}
                <strong>III Divisão Série 1 da AF Lisboa</strong>,
                enfrentando equipas da região de Lisboa Oeste com garra e determinação.
              </p>
              <div className="flex gap-4 mt-6">
                <Link
                  href="/contactos"
                  className="inline-flex items-center px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light transition-colors"
                >
                  Inscrever-me
                </Link>
                <Link
                  href="/calendario"
                  className="inline-flex items-center px-6 py-3 border-2 border-navy text-navy font-semibold rounded-lg hover:bg-navy hover:text-white transition-colors"
                >
                  Ver Calendário
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-8 flex items-center justify-center">
              <img src="/images/logo.png" alt="Futebol Alcainça AC" className="h-40 w-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Temporada Atual */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-4">Temporada 2025/26</h2>
          <p className="text-gray-500 text-center mb-10">AF Lisboa III Divisão Série 1</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <span className="block text-3xl font-bold text-navy">25</span>
              <span className="text-sm text-gray-500">Jogos</span>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <span className="block text-3xl font-bold text-green-600">11</span>
              <span className="text-sm text-gray-500">Vitórias</span>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <span className="block text-3xl font-bold text-yellow-600">3</span>
              <span className="text-sm text-gray-500">Empates</span>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <span className="block text-3xl font-bold text-red-600">11</span>
              <span className="text-sm text-gray-500">Derrotas</span>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm col-span-2 md:col-span-1">
              <span className="block text-3xl font-bold text-navy">46-47</span>
              <span className="text-sm text-gray-500">Golos M/S</span>
            </div>
          </div>

          {/* Últimos resultados */}
          <div className="mt-10 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-navy mb-4 text-center">Últimos 5 Jogos</h3>
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light transition-colors"
            >
              Ver calendário completo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Próximo Jogo */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-8">Próximo Jogo</h2>
          <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-8 text-white text-center">
            <span className="text-sm text-gold font-medium">III Divisão Série 1 &middot; Jornada 9</span>
            <div className="flex items-center justify-center gap-6 md:gap-12 my-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🏠</span>
                </div>
                <span className="font-bold">Sobreirense</span>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-gold">VS</span>
                <span className="block text-sm text-gray-300 mt-1">29 Mar 2026</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <img src="/images/logo.png" alt="Alcainça AC" className="h-10 w-auto" />
                </div>
                <span className="font-bold">Alcainça AC</span>
              </div>
            </div>
            <span className="text-sm text-gray-400">Fora</span>
          </div>
        </div>
      </section>

      {/* Equipa */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">Equipa Sénior</h2>
          <p className="text-gray-500 mb-8">AF Lisboa III Divisão Série 1 &middot; Época 2025/26</p>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <span className="text-5xl block mb-4">🏆</span>
            <h3 className="font-bold text-navy text-xl mb-2">Futebol Sénior</h3>
            <p className="text-gray-600">
              A equipa sénior do Alcainça AC é a única formação de futebol do clube,
              competindo na III Divisão da Associação de Futebol de Lisboa.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Queres jogar no Alcainça AC?</h2>
          <p className="text-gray-300 mb-8">
            Estamos sempre à procura de novos talentos. Contacta-nos para saber mais sobre inscrições.
          </p>
          <Link
            href="/contactos"
            className="inline-flex items-center px-8 py-3 bg-gold text-navy font-bold rounded-lg hover:bg-gold-light transition-colors"
          >
            Contactar
          </Link>
        </div>
      </section>
    </>
  );
}
