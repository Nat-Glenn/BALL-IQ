export default function LoadingBox({ label = "Loading..." }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="animate-pulse space-y-3">
        <div className="h-4 w-52 rounded bg-zinc-800" />
        <div className="h-3 w-72 rounded bg-zinc-900" />
        <div className="h-3 w-64 rounded bg-zinc-900" />
      </div>
      <div className="mt-4 text-sm text-zinc-400">{label}</div>
    </div>
  );
}
