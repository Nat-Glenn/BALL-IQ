import Image from "next/image";

export default function HighlightGrid({ items }) {
  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4">
      {items.map((h, idx) => (
        <div
          key={idx}
          className="grid grid-cols-1 gap-4 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-3"
        >
          <div className="relative aspect-video overflow-hidden rounded-xl bg-zinc-200">
            {h.thumbnail ? (
              <Image src={h.thumbnail} alt={h.title} fill className="object-cover" />
            ) : null}
          </div>

          <div className="md:col-span-2">
            <div className="text-xs font-semibold text-zinc-500">{h.competition}</div>
            <h3 className="mt-1 text-lg font-bold text-zinc-900">{h.title}</h3>
            <div className="mt-1 text-xs text-zinc-500">
              {new Date(h.date).toLocaleString()}
            </div>

            {h.embed ? (
              <div
                className="mt-3 overflow-hidden rounded-xl bg-zinc-100"
                dangerouslySetInnerHTML={{ __html: h.embed }}
              />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

