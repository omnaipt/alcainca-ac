export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import jogosData from "@/data/jogos.json";
import { getEventosFuturos } from "@/lib/eventos";

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

const jogos: Jogo[] = jogosData;

function isAlcaincaHome(jogo: Jogo) {
  return jogo.casa === "Alcainça AC";
}

function getResultClass(jogo: Jogo) {
  if (!jogo.resultado || jogo.resultado === "DA") return "";
  const parts = jogo.resultado.replace(/ \(a\.p\.\)/, "").split("-").map(Number);
  const golosCasa = parts[0];
  const golosFora = parts[1];
  const isHome = isAlcaincaHome(jogo);
  if (golosCasa === golosFora) return "bg-yellow-500/20 text-yellow-400";
  if ((isHome && golosCasa > golosFora) || (!isHome && golosFora > golosCasa))
    return "bg-green-500/20 text-green-400";
  return "bg-red-500/20 text-red-400";
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

export default async function Calendario() {
  const eventosFuturos = await getEventosFuturos();
  const jogados = jogos.filter((j) => j.resultado);
  const proximos = jogos.filter((j) => !j.resultado);

  const totalJogos = jogados.filter((j) => j.resultado !== "DA").length;
  let vitorias = 0, empates = 0, derrotas = 0, golosMarcados = 0, golosSofridos = 0;
  for (const j of jogados) {
    const label = getResultLabel(j);
    if (label === "V") vitorias++;
    else if (label === "E") empates++;
    else if (label === "D") derrotas++;
    if (j.resultado && j.resultado !== "DA") {
      const parts = j.resultado.replace(/ \(a\.p\.\)/, "").split("-").map(Number);
      const isHome = isAlcaincaHome(j);
      golosMarcados += isHome ? parts[0] : parts[1];
      golosSofridos += isHome ? parts[1] : parts[0];
    }
  }

  return (
    <>
      <section className="gradient-navy py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 sport-stripe opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[var(--font-display)] text-5xl md:text-7xl tracking-wider text-foreground mb-4">
            CALENDÁRIO <span className="text-gradient-gold">2025/26</span>
          </h1>
          <p className="text-muted-foreground text-lg">Futebol, Eventos e Bailes</p>
        </div>
      </section>

      {/* Eventos Especiais */}
      {eventosFuturos.length > 0 && (
        <section className="py-10 bg-card border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[var(--font-display)] text-2xl tracking-wider text-foreground mb-6 flex items-center gap-2">
              EVENTOS DO CLUBE
            </h2>
            <div className="space-y-4">
              {eventosFuturos.map((evento) => {
                const d = new Date(evento.data + "T00:00:00");
                const mes = d.toLocaleString("pt-PT", { month: "short" }).replace(".", "").toUpperCase();
                const dia = d.getDate();
                return (
                  <div key={evento.id} className="bg-secondary/50 border border-border rounded-xl overflow-hidden hover:border-gold/40 transition-colors group">
                    {evento.imagem && (
                      <div className="w-full flex justify-center bg-black/20 p-4">
                        <img src={evento.imagem} alt={evento.titulo} className="max-h-72 md:max-h-96 w-auto object-contain rounded-lg group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="gradient-gold rounded-lg p-3 text-center min-w-[70px] shrink-0 group-hover:scale-105 transition-transform">
                          <span className="block text-xs font-bold text-background">{mes}</span>
                          <span className="block text-2xl font-[var(--font-display)] text-background leading-tight">{dia}</span>
                          <span className="block text-xs text-background/80">{evento.hora}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-gold bg-gold/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                              {evento.tipo}
                            </span>
                          </div>
                          <h3 className="font-[var(--font-display)] text-lg tracking-wide text-foreground">{evento.titulo}</h3>
                          <p className="text-muted-foreground text-sm mt-1">{evento.local}</p>
                          {evento.descricao && (
                            <div className="mt-3 bg-background rounded-lg p-4 text-sm text-muted-foreground whitespace-pre-line border border-border">
                              {evento.descricao}
                            </div>
                          )}
                          {evento.marcacaoObrigatoria && (
                            <div className="mt-3 p-3 bg-accent/10 rounded-lg border border-accent/30 text-sm text-accent">
                              <strong>Marcação obrigatória.</strong> Contacte o clube para reservar o seu lugar.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="bg-card border border-border rounded-xl p-4">
              <span className="block text-2xl font-[var(--font-display)] text-foreground">{totalJogos}</span>
              <span className="text-sm text-muted-foreground">Jogos</span>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <span className="block text-2xl font-[var(--font-display)] text-green-400">{vitorias}</span>
              <span className="text-sm text-muted-foreground">Vitórias</span>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <span className="block text-2xl font-[var(--font-display)] text-yellow-400">{empates}</span>
              <span className="text-sm text-muted-foreground">Empates</span>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <span className="block text-2xl font-[var(--font-display)] text-red-400">{derrotas}</span>
              <span className="text-sm text-muted-foreground">Derrotas</span>
            </div>
            <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 col-span-2 md:col-span-1">
              <span className="block text-2xl font-[var(--font-display)] text-gold">{golosMarcados}-{golosSofridos}</span>
              <span className="text-sm text-muted-foreground">Golos M/S</span>
            </div>
          </div>
        </div>
      </section>

      {/* Próximos jogos */}
      {proximos.length > 0 && (
        <section className="py-12 bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[var(--font-display)] text-2xl tracking-wider text-foreground mb-6 flex items-center gap-2">
              <span className="w-3 h-3 gradient-gold rounded-full animate-pulse" />
              PRÓXIMOS JOGOS
            </h2>
            <div className="space-y-3">
              {proximos.map((jogo, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl border border-border hover:border-gold/40 transition-colors"
                >
                  <div className="text-center min-w-[80px]">
                    <span className="block text-xs text-muted-foreground">{jogo.jornada}</span>
                    <span className="block text-sm font-bold text-foreground">{jogo.data}</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-2 text-sm md:text-base">
                    <span className={`text-right flex-1 ${isAlcaincaHome(jogo) ? "font-bold text-gold" : "text-muted-foreground"}`}>
                      {jogo.casa}
                    </span>
                    <span className="px-3 py-1 bg-background rounded text-xs font-bold text-muted-foreground">VS</span>
                    <span className={`text-left flex-1 ${!isAlcaincaHome(jogo) ? "font-bold text-gold" : "text-muted-foreground"}`}>
                      {jogo.fora}
                    </span>
                  </div>
                  <div className="min-w-[50px] text-center">
                    <span className="text-xs px-2 py-1 rounded-full bg-gold/10 text-gold font-medium">
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
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[var(--font-display)] text-2xl tracking-wider text-foreground mb-6">RESULTADOS</h2>
          <div className="space-y-2">
            {[...jogados].reverse().map((jogo, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 md:p-4 rounded-xl hover:bg-card transition-colors border border-border"
              >
                <div className="text-center min-w-[70px] hidden md:block">
                  <span className="block text-xs text-muted-foreground">{jogo.jornada}</span>
                  <span className="block text-xs text-muted-foreground">{jogo.data}</span>
                </div>
                <div className="flex-1 flex items-center justify-center gap-2 text-sm md:text-base">
                  <span className={`text-right flex-1 ${isAlcaincaHome(jogo) ? "font-bold text-gold" : "text-muted-foreground"}`}>
                    {jogo.casa}
                  </span>
                  <span className={`px-2 py-1 rounded text-sm font-bold min-w-[60px] text-center ${jogo.resultado === "DA" ? "bg-card text-muted-foreground" : getResultClass(jogo)}`}>
                    {jogo.resultado}
                  </span>
                  <span className={`text-left flex-1 ${!isAlcaincaHome(jogo) ? "font-bold text-gold" : "text-muted-foreground"}`}>
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
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Fonte: zerozero.pt &middot; AF Lisboa III Divisão Série 1 &middot; Época 2025/26
          </p>
        </div>
      </section>

      {/* Bailes */}
      <section className="py-12 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[var(--font-display)] text-2xl tracking-wider text-foreground mb-2">
            BAILE DE DOMINGO
          </h2>
          <p className="text-muted-foreground mb-6">
            Todos os domingos às <strong className="text-foreground">15:30</strong> na sede do clube (excepto Domingo de Páscoa)
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {bailes.map((baile, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl border border-border hover:border-gold/40 transition-colors"
              >
                <div className="w-12 h-12 gradient-gold rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-lg">💃</span>
                </div>
                <div>
                  <span className="block font-bold text-foreground text-sm">{baile.data}</span>
                  <span className="block text-xs text-muted-foreground">{baile.dia} &middot; 15:30</span>
                  <span className="block text-xs text-muted-foreground">Sede do Alcainça AC</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/30 text-sm text-accent">
            <strong>Nota:</strong> Não há baile no Domingo de Páscoa (5 de Abril de 2026).
          </div>
        </div>
      </section>
    </>
  );
}
