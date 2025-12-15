import LeagueSubNav from "../../components/LeagueSubNav";
import MatchList from "../../components/MatchList";
import { MATCH_TABS } from "../../lib/leagues";
import { fetchMatches } from "../../lib/footballData";

export default async function MatchPage({ searchParams }) {
  const sp = await searchParams;
  const league = sp?.league || "ALL";

  const matches = await fetchMatches(league);

  return (
    <div className="space-y-6">
      <LeagueSubNav basePath="/match" active={league} tabs={MATCH_TABS} />

      <div className="mx-auto max-w-6xl px-4 pt-6">
        <h1 className="text-2xl font-semibold">
          {league === "ALL" ? "All Matches" : `${league} Matches`}
        </h1>
      </div>

      <MatchList matches={matches} />
    </div>
  );
}
