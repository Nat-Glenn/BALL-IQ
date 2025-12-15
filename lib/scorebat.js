
async function getAll() {
  const res = await fetch("https://www.scorebat.com/video-api/v3/", { cache: "no-store" });
  if (!res.ok) throw new Error(`Scorebat API failed: ${res.status}`);
  const json = await res.json();
  return json?.response || [];
}

function mapItem(m) {
  return {
    title: m?.title || "",
    competition: m?.competition?.name || "",
    date: m?.date || "",
    thumbnail: m?.thumbnail || "",
    embed: m?.videos?.[0]?.embed || "",
  };
}

export async function fetchScorebatHighlights(competitionHint = "") {
  const all = await getAll();
  const hint = String(competitionHint || "").toLowerCase();

  const filtered = hint
    ? all.filter((item) => {
        const comp = (item?.competition?.name || "").toLowerCase();
        const title = (item?.title || "").toLowerCase();
        return comp.includes(hint) || title.includes(hint);
      })
    : all;

  const pick = (filtered.length ? filtered : all).slice(0, 18);
  return pick.map(mapItem);
}

export async function fetchScorebatMatches(competitionHint = "") {
  return fetchScorebatHighlights(competitionHint);
}
