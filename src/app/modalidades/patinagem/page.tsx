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
      <section className="bg-gradient-to-br from-gold-dark via-gold to-gold-light text-navy py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[200px] opacity-5 font-black leading-none select-none">🛼</div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-navy/60 hover:text-navy text-sm transition-colors">Início</Link>
            <span className="text-navy/40">/</span>
            <span className="text-navy text-sm font-medium">Patinagem Artística</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Patinagem Artística</h1>
          <p className="text-xl text-navy/80 max-w-2xl">
            Elegância, técnica e paixão. A nossa secção de patinagem artística forma atletas de excelência.
          </p>
        </div>
      </section>

      {/* Sobre */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-gold-dark to-gold rounded-2xl h-80 flex items-center justify-center order-2 md:order-1">
              <img src="/images/logo.png" alt="Patinagem Alcainça AC" className="h-32 w-auto opacity-30" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-navy mb-6">Sobre a Secção de Patinagem</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                A secção de patinagem artística do Alcainça Atlético Clube é sinónimo de
                dedicação e talento. Com treinos regulares e participação em competições
                regionais e nacionais, os nossos atletas desenvolvem as suas capacidades
                num ambiente de excelência.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Trabalhamos com atletas de todas as idades, desde a iniciação até à competição,
                promovendo os valores do desporto e a disciplina necessária para alcançar
                grandes resultados.
              </p>
              <div className="flex gap-4 mt-6">
                <Link
                  href="/contactos"
                  className="inline-flex items-center px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
                >
                  Inscrever-me
                </Link>
                <Link
                  href="/calendario"
                  className="inline-flex items-center px-6 py-3 border-2 border-navy text-navy font-semibold rounded-lg hover:bg-navy hover:text-white transition-colors"
                >
                  Ver Competições
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Escalões */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Níveis de Formação</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { nome: "Iniciação", idade: "4-6 anos", desc: "Primeiros passos na patinagem" },
              { nome: "Básico", idade: "7-10 anos", desc: "Desenvolvimento de técnica base" },
              { nome: "Intermédio", idade: "11-14 anos", desc: "Aperfeiçoamento e competição" },
              { nome: "Avançado", idade: "+15 anos", desc: "Competição regional e nacional" },
            ].map((nivel, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-gold-dark font-bold">{i + 1}</span>
                </div>
                <h3 className="font-bold text-navy text-lg">{nivel.nome}</h3>
                <p className="text-sm text-gold-dark font-medium mt-1">{nivel.idade}</p>
                <p className="text-sm text-gray-500 mt-2">{nivel.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Horários */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Horários de Treino</h2>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nível</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Dias</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Horário</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { nivel: "Iniciação", dias: "A definir", horario: "A definir" },
                  { nivel: "Básico", dias: "A definir", horario: "A definir" },
                  { nivel: "Intermédio", dias: "A definir", horario: "A definir" },
                  { nivel: "Avançado", dias: "A definir", horario: "A definir" },
                ].map((treino, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-navy">{treino.nivel}</td>
                    <td className="px-6 py-4 text-gray-600">{treino.dias}</td>
                    <td className="px-6 py-4 text-gray-600">{treino.horario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-gold-dark to-gold text-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Experimenta a Patinagem Artística</h2>
          <p className="text-navy/70 mb-8">
            Aceitas o desafio? Vem experimentar uma aula gratuita e descobre o mundo da patinagem artística.
          </p>
          <Link
            href="/contactos"
            className="inline-flex items-center px-8 py-3 bg-navy text-white font-bold rounded-lg hover:bg-navy-light transition-colors"
          >
            Agendar Aula Experimental
          </Link>
        </div>
      </section>
    </>
  );
}
