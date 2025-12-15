
function mustToken() {
  const token = process.env.FOOTBALL_DATA_API_KEY;
  if (!token) throw new Error("Missing FOOTBALL_DATA_API_KEY in .env.local");
  return token;
}

async function fetchJson(url) {
  const res = await fetch(url, {
    cache: "no-store",
    headers: { "X-Auth-Token": mustToken() },
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Football-Data API failed: ${res.status} ${txt.slice(0, 160)}`);
  }
  return res.json();
}

export async function fetchStandings(competitionCode) {
  const url = `https://api.football-data.org/v4/competitions/${encodeURIComponent(
    competitionCode
  )}/standings`;

  const data = await fetchJson(url);

  const total =
    (data?.standings || []).find((s) => s?.type === "TOTAL") || data?.standings?.[0];

  const table = total?.table || [];

  return table.map((row) => ({
    position: row?.position ?? "",
    teamName: row?.team?.name ?? "Unknown",
    teamAbbr: row?.team?.tla ?? "",
    played: row?.playedGames ?? 0,
    wins: row?.won ?? 0,
    draws: row?.draw ?? 0,
    losses: row?.lost ?? 0,
    gd: row?.goalDifference ?? 0,
    points: row?.points ?? 0,
    crest: row?.team?.crest ?? "",
  }));
}

function fmtDate(d) {
  return d.toISOString().slice(0, 10);
}

async function fetchMatchesForLeague(competitionCode, dateFrom, dateTo) {
  const url =
    `https://api.football-data.org/v4/competitions/${encodeURIComponent(competitionCode)}/matches` +
    `?dateFrom=${encodeURIComponent(dateFrom)}&dateTo=${encodeURIComponent(dateTo)}`;

  const data = await fetchJson(url);
  const matches = data?.matches || [];

  return matches.map((m) => ({
    id: m?.id,
    utcDate: m?.utcDate,
    status: m?.status,
    competition: m?.competition?.code || competitionCode,
    matchday: m?.matchday ?? null,

    home: m?.homeTeam?.name || "Home",
    away: m?.awayTeam?.name || "Away",
    homeCrest: m?.homeTeam?.crest ?? "",
    awayCrest: m?.awayTeam?.crest ?? "",

    homeScore: m?.score?.fullTime?.home ?? m?.score?.halfTime?.home ?? null,
    awayScore: m?.score?.fullTime?.away ?? m?.score?.halfTime?.away ?? null,
  }));
}


export async function fetchMatches(leagueCode = "ALL") {
  const codes = ["PL", "PD", "BL1", "SA", "FL1"];

  const now = new Date();
  const from = new Date(now);
  from.setDate(from.getDate() - 14);
  const to = new Date(now);
  to.setDate(to.getDate() + 14);

  const dateFrom = fmtDate(from);
  const dateTo = fmtDate(to);

  if (!leagueCode || leagueCode === "ALL") {
    const lists = await Promise.all(codes.map((c) => fetchMatchesForLeague(c, dateFrom, dateTo)));
    const merged = lists.flat();

    // sort by time
    merged.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));
    return merged;
  }

  const list = await fetchMatchesForLeague(leagueCode, dateFrom, dateTo);
  list.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));
  return list;
}
