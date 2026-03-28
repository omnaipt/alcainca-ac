/**
 * Scraper de jogos do Alcainça AC a partir do zerozero.pt
 * Usado pelo GitHub Actions todas as terças-feiras à meia-noite.
 *
 * Estrutura HTML do zerozero.pt (tabela "zztable stats", 3.ª tabela na página):
 *   Cada <tr> tem ~10 <td>:
 *     [0] class="form" ou "h2h"  → resultado (V/D/E) ou "h2h" para futuros
 *     [1] class="double"         → data YYYY-MM-DD
 *     [2]                        → hora HH:MM
 *     [3]                        → (C) casa / (F) fora
 *     [4]                        → escudo (vazio)
 *     [5] class="text"           → nome da equipa adversária
 *     [6] class="result"         → resultado X-Y (ou "-" para futuros)
 *     [7] class="text"           → competição (ex: "AF Lisboa III Divisão Série 1 25/26")
 *     [8] class="away"           → jornada (ex: "J30", "2PE")
 *     [9]                        → links multimédia
 *
 * Uso: node scripts/scrape-jogos.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const configPath = resolve(__dirname, "scrape-config.json");
const outputPath = resolve(__dirname, "..", "src", "data", "jogos.json");

const config = JSON.parse(readFileSync(configPath, "utf-8"));

const SCRAPE_URL = `https://www.zerozero.pt/equipa/${config.teamSlug}/${config.teamId}/jogos?grp=1&epoca_id=${config.epocaId}`;

const MONTHS_PT = {
  "01": "Jan", "02": "Fev", "03": "Mar", "04": "Abr",
  "05": "Mai", "06": "Jun", "07": "Jul", "08": "Ago",
  "09": "Set", "10": "Out", "11": "Nov", "12": "Dez",
};

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${day} ${MONTHS_PT[month]} ${year}`;
}

/** Normalize competition name to match our site conventions */
function normalizeCompetition(raw) {
  if (raw.includes("Taça")) return "Taça AF Lisboa";
  if (raw.includes("III Divisão")) return "III Divisão Série 1";
  return raw.replace(/\s*\d{2}\/\d{2}\s*$/, "").trim();
}

/** Normalize jornada: "J30" stays, "2PE" → "2.ª Elim.", "1PE" → "1.ª Elim." */
function normalizeJornada(raw) {
  const trimmed = raw.trim();
  const peMatch = trimmed.match(/^(\d+)PE$/i);
  if (peMatch) return `${peMatch[1]}.ª Elim.`;
  return trimmed;
}

async function main() {
  console.log(`Fetching: ${SCRAPE_URL}`);

  let html;
  try {
    const res = await fetch(SCRAPE_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "pt-PT,pt;q=0.9,en;q=0.5",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    // zerozero.pt serves Windows-1252 despite HTML meta saying utf-8
    const buf = await res.arrayBuffer();
    html = new TextDecoder("windows-1252").decode(buf);
  } catch (err) {
    console.error("Fetch failed:", err.message);
    process.exit(1);
  }

  const { load } = await import("cheerio");
  const $ = load(html);

  const jogos = [];

  // The match table is the one with class "zztable stats" that has 30+ rows
  // It's typically the 3rd table on the page
  const tables = $("table.zztable.stats");
  let matchTable = null;

  tables.each((_, table) => {
    const rows = $(table).find("tr");
    if (rows.length >= 20) {
      matchTable = $(table);
    }
  });

  if (!matchTable) {
    console.error("Could not find match table — aborting");
    process.exit(1);
  }

  matchTable.find("tr").each((_, row) => {
    const cells = $(row).find("td");
    if (cells.length < 9) return;

    const dateStr = $(cells[1]).text().trim();     // YYYY-MM-DD
    const location = $(cells[3]).text().trim();     // (C) or (F)
    const opponent = $(cells[5]).text().trim();     // Team name
    const resultStr = $(cells[6]).text().trim();    // X-Y or -
    const compRaw = $(cells[7]).text().trim();      // Competition
    const jornadaRaw = $(cells[8]).text().trim();   // J30, 2PE, etc.

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return;
    if (!opponent) return;

    const data = formatDate(dateStr);
    const isHome = location === "(C)";
    const competicao = normalizeCompetition(compRaw);
    const jornada = normalizeJornada(jornadaRaw);

    const jogo = {
      data,
      casa: isHome ? "Alcainça AC" : opponent,
      fora: isHome ? opponent : "Alcainça AC",
      jornada,
      competicao,
    };

    // Parse result (skip "-" which means game not yet played)
    if (resultStr && resultStr !== "-") {
      // Handle special results
      if (resultStr === "DA" || resultStr.includes("DA")) {
        jogo.resultado = "DA";
      } else {
        // Normalize spacing: "4-5(a.p.)" → "4-5 (a.p.)"
        jogo.resultado = resultStr.replace(/(\d)\(/, "$1 (");
      }
    }

    jogos.push(jogo);
  });

  console.log(`Parsed ${jogos.length} matches`);

  if (jogos.length < 5) {
    console.error("Too few matches found — aborting to protect existing data");
    process.exit(1);
  }

  // Sort by date (oldest first)
  jogos.sort((a, b) => toISO(a.data).localeCompare(toISO(b.data)));

  // Compare with existing data
  let existingData = "[]";
  try {
    existingData = readFileSync(outputPath, "utf-8");
  } catch {
    // File doesn't exist yet
  }

  const newData = JSON.stringify(jogos, null, 2) + "\n";

  if (newData.trim() === existingData.trim()) {
    console.log("No changes detected — skipping write");
    process.exit(0);
  }

  writeFileSync(outputPath, newData, "utf-8");
  console.log(`Written ${jogos.length} matches to ${outputPath}`);

  const withResult = jogos.filter((j) => j.resultado);
  const withoutResult = jogos.filter((j) => !j.resultado);
  console.log(`  - ${withResult.length} played, ${withoutResult.length} upcoming`);
}

function toISO(dataPT) {
  const MONTHS_REV = {
    Jan: "01", Fev: "02", Mar: "03", Abr: "04",
    Mai: "05", Jun: "06", Jul: "07", Ago: "08",
    Set: "09", Out: "10", Nov: "11", Dez: "12",
  };
  const parts = dataPT.split(" ");
  if (parts.length < 3) return "9999-99-99";
  return `${parts[2]}-${MONTHS_REV[parts[1]] || "00"}-${parts[0]}`;
}

main().catch((err) => {
  console.error("Scraper error:", err);
  process.exit(1);
});
