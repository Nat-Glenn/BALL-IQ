import Image from "next/image";

function groupByDate(matches) {
  const groups = new Map();

  for (const m of matches) {
    const d = m.utcDate ? new Date(m.utcDate) : null;
    const key = d ? d.toISOString().slice(0, 10) : "TBD";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(m);
  }

  const sortedKeys = [...groups.keys()].sort((a, b) => {
    if (a === "TBD") return 1;
    if (b === "TBD") return -1;
    return new Date(a) - new Date(b);
  });

  return sortedKeys.map((k) => ({ dateKey: k, items: groups.get(k) }));
}

function prettyDateLabel(dateKey) {
  if (dateKey === "TBD") return "TBD";

  const d = new Date(dateKey + "T00:00:00");
  const today = new Date();
  const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const d0 = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const diffDays = Math.round((d0 - t0) / (1000 * 60 * 60 * 24));

  let suffix = "";
  if (diffDays === 0) suffix = "Today";
  else if (diffDays === -1) suffix = "Yesterday";
  else if (diffDays === 1) suffix = "Tomorrow";

  return suffix ? `${dateKey}  ${suffix}` : dateKey;
}

export default function MatchList({ matches }) {
  if (!matches?.length) {
    return (
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-600">
          No matches returned for this date range.
        </div>
      </div>
    );
  }

  const grouped = groupByDate(matches);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4">
      {grouped.map((g) => (
        <section key={g.dateKey} className="space-y-3">
          {/* Date header */}
          <div className="text-sm font-semibold text-zinc-700">
            {prettyDateLabel(g.dateKey)}
          </div>

          <div className="space-y-3">
            {g.items.map((m) => {
              const dt = m.utcDate ? new Date(m.utcDate) : null;
              const timeStr = dt
                ? dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "";

              const hasScore =
                typeof m.homeScore === "number" || typeof m.awayScore === "number";

              return (
                <div
                  key={m.id ?? `${m.home}-${m.away}-${m.utcDate}`}
                  className="rounded-2xl bg-white px-4 py-4 shadow-sm"
                >
                  <div className="grid grid-cols-3 items-center gap-3">
                    {/* Home */}
                    <div className="flex items-center gap-3">
                      {m.homeCrest ? (
                        <Image
                          src={m.homeCrest}
                          alt={m.home}
                          width={40}
                          height={40}
                          className="h-10 w-10"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-zinc-200" />
                      )}
                      <div className="text-sm font-semibold text-zinc-900">{m.home}</div>
                    </div>

                    {/* Center */}
                    <div className="text-center">
                      <div className="text-xs text-zinc-500">
                        {m.competition} {m.matchday ? `• MD ${m.matchday}` : ""}
                      </div>

                      <div className="mt-1 text-2xl font-bold text-zinc-900">
                        {hasScore ? (m.homeScore ?? 0) : "-"}
                        <span className="mx-3 text-zinc-400">-</span>
                        {hasScore ? (m.awayScore ?? 0) : "-"}
                      </div>

                      <div className="mt-1 text-xs text-zinc-500">
                        {m.status || "SCHEDULED"} {timeStr ? `• ${timeStr}` : ""}
                      </div>
                    </div>

                    {/* Away */}
                    <div className="flex items-center justify-end gap-3">
                      <div className="text-sm font-semibold text-zinc-900">{m.away}</div>
                      {m.awayCrest ? (
                        <Image
                          src={m.awayCrest}
                          alt={m.away}
                          width={40}
                          height={40}
                          className="h-10 w-10"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-zinc-200" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

