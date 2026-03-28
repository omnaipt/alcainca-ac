import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendário",
  description: "Calendário de jogos e competições do Alcainça Atlético Clube - Época 2025/26.",
};

type Jogo = {
  data: string;
  casa: string;
  fora: string;
  resultado?: string;
  jornada: string;
  competicao: string;
};

const jogos: Jogo[] = [
  { data: "07 Set 2025", casa: "SRD Negrais", fora: "Alcainça AC", resultado: "4-5 (a.p.)", jornada: "1.ª Elim.", competicao: "Taça AF Lisboa" },
  { data: "14 Set 2025", casa: "Alcainça AC", fora: "Monte Agrão", resultado: "1-4", jornada: "2.ª Elim.", competicao: "Taça AF Lisboa" },
  { data: "21 Set 2025", casa: "Alcainça AC", fora: "Aveiras", resultado: "1-1", jornada: "J1", competicao: "III Divisão Série 1" },
  { data: "28 Set 2025", casa: "Vilafranquense", fora: "Alcainça AC", resultado: "2-1", jornada: "J2", competicao: "III Divisão Série 1" },
  { data: "05 Out 2025", casa: "Alcainça AC", fora: "Freiria", resultado: "DA", jornada: "J3", competicao: "III Divisão Série 1" },
  { data: "12 Out 2025", casa: "A dos Cunhados", fora: "Alcainça AC", resultado: "2-3", jornada: "J4", competicao: "III Divisão Série 1" },
  { data: "19 Out 2025", casa: "Alcainça AC", fora: "Monte Agrão", resultado: "0-1", jornada: "J5", competicao: "III Divisão Série 1" },
  { data: "26 Out 2025", casa: "Alcainça AC", fora: "SC Livramento", resultado: "2-1", jornada: "J21", competicao: "III Divisão Série 1" },
  { data: "02 Nov 2025", casa: "Alcainça AC", fora: "Juv. Castanheira", resultado: "1-1", jornada: "J7", competicao: "III Divisão Série 1" },
  { data: "09 Nov 2025", casa: "Venda do Pinheiro", fora: "Alcainça AC", resultado: "5-1", jornada: "J8", competicao: "III Divisão Série 1" },
  { data: "16 Nov 2025", casa: "Alcainça AC", fora: "Sobreirense", resultado: "5-3", jornada: "J24", competicao: "III Divisão Série 1" },
  { data: "30 Nov 2025", casa: "Alcainça AC", fora: "Pedra", resultado: "1-1", jornada: "J10", competicao: "III Divisão Série 1" },
  { data: "07 Dez 2025", casa: "Igreja Nova", fora: "Alcainça AC", resultado: "4-1", jornada: "J11", competicao: "III Divisão Série 1" },
  { data: "14 Dez 2025", casa: "Alcainça AC", fora: "SRD Negrais", resultado: "0-1", jornada: "J12", competicao: "III Divisão Série 1" },
  { data: "21 Dez 2025", casa: "São Pedro", fora: "Alcainça AC", resultado: "2-1", jornada: "J13", competicao: "III Divisão Série 1" },
  { data: "11 Jan 2026", casa: "Alcainça AC", fora: "Arrudense", resultado: "5-1", jornada: "J14", competicao: "III Divisão Série 1" },
  { data: "18 Jan 2026", casa: "Alenquer e Benfica", fora: "Alcainça AC", resultado: "0-1", jornada: "J15", competicao: "III Divisão Série 1" },
  { data: "25 Jan 2026", casa: "Aveiras", fora: "Alcainça AC", resultado: "1-2", jornada: "J16", competicao: "III Divisão Série 1" },
  { data: "01 Fev 2026", casa: "Alcainça AC", fora: "Vilafranquense", resultado: "0-1", jornada: "J17", competicao: "III Divisão Série 1" },
  { data: "13 Fev 2026", casa: "Freiria", fora: "Alcainça AC", resultado: "3-2", jornada: "J18", competicao: "III Divisão Série 1" },
  { data: "22 Fev 2026", casa: "Alcainça AC", fora: "A dos Cunhados", resultado: "2-1", jornada: "J19", competicao: "III Divisão Série 1" },
  { data: "01 Mar 2026", casa: "Monte Agrão", fora: "Alcainça AC", resultado: "3-4", jornada: "J20", competicao: "III Divisão Série 1" },
  { data: "08 Mar 2026", casa: "SC Livramento", fora: "Alcainça AC", resultado: "0-1", jornada: "J6", competicao: "III Divisão Série 1" },
  { data: "15 Mar 2026", casa: "Juv. Castanheira", fora: "Alcainça AC", resultado: "2-1", jornada: "J22", competicao: "III Divisão Série 1" },
  { data: "22 Mar 2026", casa: "Alcainça AC", fora: "Venda do Pinheiro", resultado: "2-3", jornada: "J23", competicao: "III Divisão Série 1" },
  { data: "29 Mar 2026", casa: "Sobreirense", fora: "Alcainça AC", jornada: "J9", competicao: "III Divisão Série 1" },
  { data: "12 Abr 2026", casa: "Pedra", fora: "Alcainça AC", jornada: "J25", competicao: "III Divisão Série 1" },
  { data: "19 Abr 2026", casa: "Alcainça AC", fora: "Igreja Nova", jornada: "J26", competicao: "III Divisão Série 1" },
  { data: "26 Abr 2026", casa: "Alcainça AC", fora: "SRD Negrais", jornada: "J27", competicao: "III Divisão Série 1" },
  { data: "03 Mai 2026", casa: "Alcainça AC", fora: "São Pedro", jornada: "J28", competicao: "III Divisão Série 1" },
  { data: "10 Mai 2026", casa: "Arrudense", fora: "Alcainça AC", jornada: "J29", competicao: "III Divisão Série 1" },
  { data: "17 Mai 2026", casa: "Alcainça AC", fora: "Alenquer e Benfica", jornada: "J30", competicao: "III Divisão Série 1" },
];

function isAlcaincaHome(jogo: Jogo) {
  return jogo.casa === "Alcainça AC";
}

function getResultClass(jogo: Jogo) {
  if (!jogo.resultado || jogo.resultado === "DA") return "";
  const parts = jogo.resultado.replace(/ \(a\.p\.\)/, "").split("-").map(Number);
  const golosCasa = parts[0];
  const golosFora = parts[1];
  const isHome = isAlcaincaHome(jogo);
  if (golosCasa === golosFora) return "bg-yellow-100 text-yellow-800";
  if ((isHome && golosCasa > golosFora) || (!isHome && golosFora > golosCasa))
    return "bg-green-100 text-green-800";
  return "bg-red-100 text-red-800";
}

function getResultLabel(jogo: Jogo) {
  if (!jogo.resultado || jogo.resultado === "DA") return "";
  const parts = jogo.resultado.replace(/ \(a\.p\.\)/, "").split("-").map(Number);
  const golosCasa = parts[0];
  const golosFora = parts[1];
  const isHome = isAlcaincaHome(jogo);
  if (golosCasa === golosFora) return "E";
  if ((isHome && golosCasa > golosFora) || (!isHome && golosFora > golosCasa))
    return "V";
  return "D";
}

const bailes = [
  { data: "29 Mar 2026", dia: "Domingo" },
  // 5 Abr 2026 - Domingo de Páscoa - SEM BAILE
  { data: "12 Abr 2026", dia: "Domingo" },
  { data: "19 Abr 2026", dia: "Domingo" },
  { data: "26 Abr 2026", dia: "Domingo" },
  { data: "03 Mai 2026", dia: "Domingo" },
  { data: "10 Mai 2026", dia: "Domingo" },
  { data: "17 Mai 2026", dia: "Domingo" },
  { data: "24 Mai 2026", dia: "Domingo" },
  { data: "31 Mai 2026", dia: "Domingo" },
  { data: "07 Jun 2026", dia: "Domingo" },
  { data: "14 Jun 2026", dia: "Domingo" },
  { data: "21 Jun 2026", dia: "Domingo" },
  { data: "28 Jun 2026", dia: "Domingo" },
];

export default function Calendario() {
  const jogados = jogos.filter((j) => j.resultado);
  const proximos = jogos.filter((j) => !j.resultado);

  return (
    <>
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Calendário 2025/26</h1>
          <p className="text-xl text-gray-300">Futebol, Eventos e Bailes</p>
        </div>
      </section>

      {/* Eventos Especiais */}
      <section className="py-10 bg-gold/10 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
            <span className="text-2xl">📋</span>
            Eventos do Clube
          </h2>
          <div className="space-y-4">
            {/* Assembleia Geral */}
            <div className="bg-white rounded-xl p-6 border border-gold/30 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-navy text-white rounded-lg p-3 text-center min-w-[70px] shrink-0">
                  <span className="block text-xs font-medium text-gold">Mar</span>
                  <span className="block text-2xl font-bold leading-tight">30</span>
                  <span className="block text-xs">21:00</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-navy/10 text-navy">Sócios</span>
                  </div>
                  <h3 className="font-bold text-navy text-lg">Assembleia Geral Ordinária</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Pavilhão do Alcainça Atlético Clube, às 21h em primeira convocação.
                    Se não estiverem presentes dois terços dos sócios, realiza-se em segunda convocação 30 minutos depois.
                  </p>
                  <div className="mt-3 bg-gray-50 rounded-lg p-4 text-sm">
                    <h4 className="font-bold text-navy mb-2">Ordem dos Trabalhos:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-gray-600">
                      <li>Apreciação, discussão e aprovação do Relatório e Contas do Exercício de 2026 e Parecer do Conselho Fiscal</li>
                      <li>Plano de Atividades para o ano de 2026</li>
                      <li>Orçamento para o ano de 2026</li>
                      <li>Assuntos Diversos</li>
                    </ol>
                    <p className="mt-3 text-xs text-gray-400">A Presidente da Assembleia Geral — Paula Maria Marchante Jorge Caramelo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Jantar Aniversário */}
            <div className="bg-white rounded-xl p-6 border border-gold/30 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-navy text-white rounded-lg p-3 text-center min-w-[70px] shrink-0">
                  <span className="block text-xs font-medium text-gold">Abr</span>
                  <span className="block text-2xl font-bold leading-tight">18</span>
                  <span className="block text-xs">19:30</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gold/20 text-gold-dark">Aniversário</span>
                  </div>
                  <h3 className="font-bold text-navy text-lg">Jantar Comemorativo do 76.º Aniversário</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    A direção do Alcainça Atlético Clube convida todos os sócios e amigos para o jantar
                    comemorativo do 76.º aniversário do clube, às 19h30 na Sede do Alcainça Atlético Clube.
                  </p>
                  <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200 text-sm text-amber-800">
                    <strong>Marcação obrigatória.</strong> Contacte o clube para reservar o seu lugar.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="bg-gray-50 rounded-xl p-4">
              <span className="block text-2xl font-bold text-navy">25</span>
              <span className="text-sm text-gray-500">Jogos</span>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <span className="block text-2xl font-bold text-green-700">11</span>
              <span className="text-sm text-gray-500">Vitórias</span>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4">
              <span className="block text-2xl font-bold text-yellow-700">3</span>
              <span className="text-sm text-gray-500">Empates</span>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <span className="block text-2xl font-bold text-red-700">11</span>
              <span className="text-sm text-gray-500">Derrotas</span>
            </div>
            <div className="bg-navy/5 rounded-xl p-4 col-span-2 md:col-span-1">
              <span className="block text-2xl font-bold text-navy">46-47</span>
              <span className="text-sm text-gray-500">Golos M/S</span>
            </div>
          </div>
        </div>
      </section>

      {/* Próximos jogos */}
      {proximos.length > 0 && (
        <section className="py-12 bg-gold/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-gold rounded-full animate-pulse" />
              Próximos Jogos
            </h2>
            <div className="space-y-3">
              {proximos.map((jogo, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gold/30 shadow-sm"
                >
                  <div className="text-center min-w-[80px]">
                    <span className="block text-xs text-gray-400">{jogo.jornada}</span>
                    <span className="block text-sm font-bold text-navy">{jogo.data}</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-2 text-sm md:text-base">
                    <span className={`text-right flex-1 ${isAlcaincaHome(jogo) ? "font-bold text-navy" : "text-gray-700"}`}>
                      {jogo.casa}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded text-xs font-bold text-gray-400">VS</span>
                    <span className={`text-left flex-1 ${!isAlcaincaHome(jogo) ? "font-bold text-navy" : "text-gray-700"}`}>
                      {jogo.fora}
                    </span>
                  </div>
                  <div className="min-w-[50px] text-center">
                    <span className="text-xs px-2 py-1 rounded-full bg-navy/10 text-navy font-medium">
                      {isAlcaincaHome(jogo) ? "Casa" : "Fora"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Resultados */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-6">Resultados</h2>
          <div className="space-y-2">
            {[...jogados].reverse().map((jogo, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 md:p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
              >
                <div className="text-center min-w-[70px] hidden md:block">
                  <span className="block text-xs text-gray-400">{jogo.jornada}</span>
                  <span className="block text-xs text-gray-500">{jogo.data}</span>
                </div>
                <div className="flex-1 flex items-center justify-center gap-2 text-sm md:text-base">
                  <span className={`text-right flex-1 ${isAlcaincaHome(jogo) ? "font-bold text-navy" : "text-gray-700"}`}>
                    {jogo.casa}
                  </span>
                  <span className={`px-2 py-1 rounded text-sm font-bold min-w-[60px] text-center ${jogo.resultado === "DA" ? "bg-gray-100 text-gray-500" : getResultClass(jogo)}`}>
                    {jogo.resultado}
                  </span>
                  <span className={`text-left flex-1 ${!isAlcaincaHome(jogo) ? "font-bold text-navy" : "text-gray-700"}`}>
                    {jogo.fora}
                  </span>
                </div>
                <div className="min-w-[28px] text-center hidden md:block">
                  {jogo.resultado !== "DA" && (
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${getResultClass(jogo)}`}>
                      {getResultLabel(jogo)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            Fonte: zerozero.pt &middot; AF Lisboa III Divisão Série 1 &middot; Época 2025/26
          </p>
        </div>
      </section>

      {/* Bailes */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-2 flex items-center gap-3">
            <span className="text-3xl">💃</span>
            Baile de Domingo
          </h2>
          <p className="text-gray-500 mb-6">
            Todos os domingos às <strong>15:30</strong> na sede do clube (excepto Domingo de Páscoa)
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {bailes.map((baile, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-lg">💃</span>
                </div>
                <div>
                  <span className="block font-bold text-navy text-sm">{baile.data}</span>
                  <span className="block text-xs text-gray-500">{baile.dia} &middot; 15:30</span>
                  <span className="block text-xs text-gray-400">Sede do Alcainça AC</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200 text-sm text-amber-800">
            <strong>Nota:</strong> Não há baile no Domingo de Páscoa (5 de Abril de 2026).
          </div>
        </div>
      </section>
    </>
  );
}
