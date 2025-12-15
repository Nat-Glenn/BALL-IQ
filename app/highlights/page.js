import HighlightGrid from "../../components/HighlightGrid";
import { fetchScorebatHighlights } from "../../lib/scorebat";

export default async function HighlightsPage() {
  const items = await fetchScorebatHighlights("");

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <h1 className="text-2xl font-semibold">Highlights</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Latest highlight videos across leagues.
        </p>
      </div>

      <HighlightGrid items={items} />
    </div>
  );
}



