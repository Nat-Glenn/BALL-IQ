"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function FootballIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="12 7 15 9 14 13 10 13 9 9" />
      <line x1="12" y1="7" x2="12" y2="2" />
      <line x1="15" y1="9" x2="20" y2="7" />
      <line x1="14" y1="13" x2="17" y2="18" />
      <line x1="10" y1="13" x2="7" y2="18" />
      <line x1="9" y1="9" x2="4" y2="7" />
    </svg>
  );
}

function NavItem({ href, label, active }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "px-5 py-3 text-sm font-semibold tracking-wide transition",
        "text-white/80 hover:text-white",
        "rounded-full",
        active ? "bg-white/15 text-white" : "hover:bg-white/10",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export default function TopNav() {
  const pathname = usePathname();

  const isMatch = pathname.startsWith("/match");
  const isHighlights = pathname.startsWith("/highlights");
  const isStandings = pathname.startsWith("/standings");

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white">
            <FootballIcon />
          </div>
          <div className="leading-tight">
            <div className="text-base font-bold text-white">Ball-IQ</div>
            <div className="text-xs text-white/60">
              Matches • Highlights • Standings
            </div>
          </div>
        </Link>

        {/* Tabs */}
        <nav className="flex items-center gap-2">
          <NavItem href="/match" label="MATCH" active={isMatch} />
          <NavItem href="/highlights" label="HIGHLIGHTS" active={isHighlights} />
          <NavItem href="/standings" label="STANDINGS" active={isStandings} />
        </nav>
      </div>
    </header>
  );
}
