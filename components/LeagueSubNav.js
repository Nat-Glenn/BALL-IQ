import Link from "next/link";

export default function LeagueSubNav({ basePath, active, tabs }) {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
        {tabs.map((t) => {
          const isActive = t.key === active;
          const href =
            t.key === "ALL" ? basePath : `${basePath}?league=${t.key}`;

          return (
            <Link
              key={t.key}
              href={href}
              className={[
                "whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition",
                isActive
                  ? "bg-slate-900 text-white"
                  : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200",
              ].join(" ")}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
