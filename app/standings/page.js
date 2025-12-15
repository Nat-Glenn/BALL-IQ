import LeagueSubNav from "../../components/LeagueSubNav";
import StandingsTable from "../../components/StandingsTable";
import { STANDINGS_TABS, LEAGUE_META } from "../../lib/leagues";
import { fetchStandings } from "../../lib/footballData";

export default async function StandingsPage({ searchParams }) {
  const sp = await searchParams;
  const league = sp?.league || "PL";

  const rows = await fetchStandings(league);

  return (
    <div className="space-y-6">
      <LeagueSubNav
        basePath="/standings"
        active={league}
        tabs={STANDINGS_TABS}
      />

      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-2xl font-semibold">
          {LEAGUE_META[league]?.name || "Standings"}
        </h1>
        <p className="text-sm text-zinc-600">
          {LEAGUE_META[league]?.country}
        </p>
      </div>

      <StandingsTable rows={rows} />
    </div>
  );
}
