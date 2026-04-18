#!/usr/bin/env node
/**
 * update-fpf.js
 *
 * Consulta a API pública da FPF (resultados.fpf.pt) e reescreve
 * data/alcainca.json com a classificação, jogos e estatísticas
 * atuais do Alcainça AC.
 *
 * Corrido automaticamente pelo GitHub Action .github/workflows/update-fpf.yml
 * todas as segundas-feiras às 22:00 UTC.
 *
 * Uso manual:
 *   node scripts/update-fpf.js
 *
 * Variáveis de ambiente (opcional — override dos defaults):
 *   FPF_COMPETITION_ID   id da competição (default 20390 — III Div AFL)
 *   FPF_SEASON_ID        id da época (default 101 — 2025/26)
 *   FPF_CLUB_NAME        nome do clube para matching (default "Alcainça")
 */

const fs = require('fs');
const path = require('path');

const COMPETITION_ID = process.env.FPF_COMPETITION_ID || '28127';
const SEASON_ID = process.env.FPF_SEASON_ID || '105';
const CLUB_NAME = (process.env.FPF_CLUB_NAME || 'Alcainça').toLowerCase();

const BASE = 'https://resultados.fpf.pt';
const OUT = path.join(__dirname, '..', 'data', 'alcainca.json');

// ──────────────────────────────────────────────────────────────
// Helpers

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'alcainca-ac-site/1.0 (+https://github.com/omnaipt/alcainca-ac)',
      'Accept': 'text/html,application/xhtml+xml',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function normalize(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function matchesClub(name) {
  return normalize(name).includes(normalize(CLUB_NAME));
}

/**
 * Parse uma tabela de classificação HTML (formato FPF).
 * Retorna array de { pos, team, played, wins, draws, losses, gf, ga, points }
 */
function parseStandings(html) {
  const rows = [];
  // FPF renderiza linhas como <tr>...<td>POS</td><td>TEAM</td>...
  const trRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let m;
  while ((m = trRe.exec(html)) !== null) {
    const tds = [...m[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(x =>
      x[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    );
    // Linha válida: 9 colunas (pos, team, jgs, v, e, d, gm, gs, pts)
    if (tds.length >= 9 && /^\d+$/.test(tds[0])) {
      rows.push({
        pos: parseInt(tds[0], 10),
        team: tds[1],
        played: parseInt(tds[2], 10),
        wins: parseInt(tds[3], 10),
        draws: parseInt(tds[4], 10),
        losses: parseInt(tds[5], 10),
        gf: parseInt(tds[6], 10),
        ga: parseInt(tds[7], 10),
        points: parseInt(tds[8], 10),
      });
    }
  }
  return rows;
}

/**
 * Extrai fixtureIds (jornadas) da página principal da competição.
 * Retorna { series: [{ name, fixtures: [id, ...] }] }
 */
function parseFixtures(html) {
  // Cada série tem links "GetClassificationAndMatchesByFixture?fixtureId=N"
  const re = /fixtureId=(\d+)/g;
  const all = [...html.matchAll(re)].map(m => parseInt(m[1], 10));
  // Dedup mantendo ordem
  return [...new Set(all)];
}

/**
 * Parse jogos de uma página de jornada. Retorna [{ home, away, homeGoals, awayGoals, date, venue, matchId, played }]
 */
function parseMatches(html) {
  const matches = [];
  // Formato típico: <a href="...matchId=NNN">HOME\n  A - B \n  DATE\n  AWAY\n  VENUE</a>
  const linkRe = /<a[^>]+matchId=(\d+)[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = linkRe.exec(html)) !== null) {
    const matchId = parseInt(m[1], 10);
    const body = m[2].replace(/<[^>]*>/g, '\n').replace(/\n\s*\n/g, '\n').trim();
    const lines = body.split('\n').map(s => s.trim()).filter(Boolean);
    if (lines.length < 3) continue;

    // lines: [home, "A - B", date, away, venue?]
    const home = lines[0];
    const score = lines[1] || '';
    const date = lines[2] || '';
    const away = lines[3] || '';
    const venue = lines[4] || '';

    let homeGoals = null, awayGoals = null, played = false;
    const scoreMatch = score.match(/^(\d+)\s*-\s*(\d+)$/);
    if (scoreMatch) {
      homeGoals = parseInt(scoreMatch[1], 10);
      awayGoals = parseInt(scoreMatch[2], 10);
      played = true;
    }
    matches.push({ matchId, home, away, homeGoals, awayGoals, date, venue, played });
  }
  return matches;
}

// ──────────────────────────────────────────────────────────────
// Main

async function main() {
  console.log(`→ Consultando FPF (competitionId=${COMPETITION_ID}, clube="${CLUB_NAME}")...`);

  const detailsUrl = `${BASE}/Competition/Details?competitionId=${COMPETITION_ID}&seasonId=${SEASON_ID}`;
  const detailsHtml = await fetchText(detailsUrl);

  // 1) Descobre todas as fixtures e classificação inicial
  const fixtureIds = parseFixtures(detailsHtml);
  console.log(`  ${fixtureIds.length} jornadas encontradas`);

  // 2) A página já vem com classificação(ões) visíveis. Tenta primeiro ali.
  let standings = parseStandings(detailsHtml);
  let teamRow = standings.find(r => matchesClub(r.team));

  // 3) Se não encontrou, itera por fixtures para obter classificação mais recente
  if (!teamRow && fixtureIds.length) {
    for (const fid of fixtureIds.slice().reverse()) {
      const fHtml = await fetchText(`${BASE}/Competition/GetClassificationAndMatchesByFixture?fixtureId=${fid}`);
      const s = parseStandings(fHtml);
      const row = s.find(r => matchesClub(r.team));
      if (row) { standings = s; teamRow = row; break; }
    }
  }

  // 4) Agrega todos os jogos das jornadas (filtrados para o clube)
  const clubMatches = [];
  for (const fid of fixtureIds) {
    try {
      const fHtml = await fetchText(`${BASE}/Competition/GetClassificationAndMatchesByFixture?fixtureId=${fid}`);
      const ms = parseMatches(fHtml).filter(m => matchesClub(m.home) || matchesClub(m.away));
      for (const mm of ms) clubMatches.push({ ...mm, fixtureId: fid });
    } catch (e) {
      console.warn(`  ⚠ jornada ${fid} falhou: ${e.message}`);
    }
  }

  // 5) Separa jogados/por jogar, calcula form (últimos 5)
  const played = clubMatches.filter(m => m.played);
  const upcoming = clubMatches.filter(m => !m.played);

  const form = played.slice(-5).map(m => {
    const isHome = matchesClub(m.home);
    const our = isHome ? m.homeGoals : m.awayGoals;
    const their = isHome ? m.awayGoals : m.homeGoals;
    if (our > their) return 'V';
    if (our < their) return 'D';
    return 'E';
  });

  // 6) Monta payload
  const out = {
    _meta: {
      last_updated: new Date().toISOString(),
      source: 'fpf-api',
      competition_id: parseInt(COMPETITION_ID, 10),
      season_id: parseInt(SEASON_ID, 10),
      fixtures_found: fixtureIds.length,
      matches_found: clubMatches.length,
      note: 'Ficheiro gerado automaticamente por scripts/update-fpf.js. NÃO editar à mão.',
    },
    competition: {
      name: 'CD III Divisão · Série I',
      season: '2025/26',
      association: 'AF Lisboa',
    },
    team: {
      name: 'Alcainça AC',
      short: 'Alcainça',
      found_in_standings: !!teamRow,
    },
    standings,
    matches: { played, upcoming },
    stats: teamRow ? {
      position: teamRow.pos,
      played: teamRow.played,
      wins: teamRow.wins,
      draws: teamRow.draws,
      losses: teamRow.losses,
      goals_for: teamRow.gf,
      goals_against: teamRow.ga,
      points: teamRow.points,
      form,
    } : {
      position: null, played: 0, wins: 0, draws: 0, losses: 0,
      goals_for: 0, goals_against: 0, points: 0, form: [],
    },
    next_match: upcoming[0] || null,
    last_match: played[played.length - 1] || null,
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');

  console.log(`✓ Escrito ${OUT}`);
  console.log(`  Clube encontrado: ${out.team.found_in_standings ? 'SIM' : 'NÃO'}`);
  if (teamRow) {
    console.log(`  Posição: ${teamRow.pos}º · ${teamRow.points} pts · ${played.length} jogos`);
  } else {
    console.log(`  ⚠ "${CLUB_NAME}" não encontrado na competição ${COMPETITION_ID}.`);
    console.log(`    Ajuste FPF_COMPETITION_ID ou FPF_CLUB_NAME e volte a correr.`);
  }
}

main().catch(err => {
  console.error('✗ update-fpf falhou:', err);
  process.exit(1);
});
