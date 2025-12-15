import Link from "next/link";

function BigLink({ href, title, desc }) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:shadow"
    >
      <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
      <p className="mt-1 text-sm text-zinc-600">{desc}</p>
    </Link>
  );
}

function LeagueChip({ href, label }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:border-zinc-300"
    >
      {label}
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-10 px-4">
      <section className="mx-auto max-w-6xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-zinc-900">Ball-IQ</h1>
        <p className="mt-2 max-w-2xl text-zinc-600">
          A football hub for top European leagues. Browse matches by league, watch highlight videos,
          and view live standings.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <BigLink
            href="/match"
            title="Match"
            desc="See recent + upcoming fixtures, sorted by date/time. Filter by league."
          />
          <BigLink
            href="/highlights"
            title="Video"
            desc="Watch recent highlight clips. Filter by league."
          />
          <BigLink
            href="/standings"
            title="Stats"
            desc="View current league tables (EPL, La Liga, Bundesliga, Serie A, Ligue 1)."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-3">
        <h2 className="text-xl font-semibold">Quick League Links</h2>
        <div className="flex flex-wrap gap-2">
          <LeagueChip href="/match?league=PL" label="EPL Matches" />
          <LeagueChip href="/match?league=PD" label="La Liga Matches" />
          <LeagueChip href="/match?league=BL1" label="Bundesliga Matches" />
          <LeagueChip href="/match?league=SA" label="Serie A Matches" />
          <LeagueChip href="/match?league=FL1" label="Ligue 1 Matches" />
        </div>

        <div className="flex flex-wrap gap-2">
          <LeagueChip href="/highlights?league=PL" label="EPL Highlights" />
          <LeagueChip href="/highlights?league=PD" label="La Liga Highlights" />
          <LeagueChip href="/highlights?league=BL1" label="Bundesliga Highlights" />
          <LeagueChip href="/highlights?league=SA" label="Serie A Highlights" />
          <LeagueChip href="/highlights?league=FL1" label="Ligue 1 Highlights" />
        </div>

        <div className="flex flex-wrap gap-2">
          <LeagueChip href="/standings?league=PL" label="EPL Standings" />
          <LeagueChip href="/standings?league=PD" label="La Liga Standings" />
          <LeagueChip href="/standings?league=BL1" label="Bundesliga Standings" />
          <LeagueChip href="/standings?league=SA" label="Serie A Standings" />
          <LeagueChip href="/standings?league=FL1" label="Ligue 1 Standings" />
        </div>
      </section>
    </div>
  );
}
