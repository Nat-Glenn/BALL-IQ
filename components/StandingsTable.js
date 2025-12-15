import Image from "next/image";

export default function StandingsTable({ rows }) {
  if (!rows?.length) {
    return (
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-600">
          No standings found.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="grid grid-cols-8 gap-2 bg-slate-900 px-4 py-3 text-xs font-semibold text-white">
          <div>#</div>
          <div className="col-span-2">Team</div>
          <div>P</div>
          <div>W</div>
          <div>D</div>
          <div>L</div>
          <div className="text-right">Pts</div>
        </div>

        <div className="divide-y divide-zinc-100">
          {rows.map((r) => (
            <div
              key={r.teamName}
              className="grid grid-cols-8 items-center gap-2 px-4 py-3 text-sm"
            >
              <div className="text-zinc-600">{r.position}</div>

              <div className="col-span-2 flex items-center gap-3">
                {r.crest ? (
                  <Image src={r.crest} alt={r.teamName} width={22} height={22} />
                ) : (
                  <div className="h-[22px] w-[22px] rounded bg-zinc-200" />
                )}
                <div className="font-semibold text-zinc-900">{r.teamName}</div>
              </div>

              <div>{r.played}</div>
              <div>{r.wins}</div>
              <div>{r.draws}</div>
              <div>{r.losses}</div>
              <div className="text-right font-bold">{r.points}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

