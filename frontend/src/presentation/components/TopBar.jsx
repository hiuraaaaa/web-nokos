export function TopBar({ balance, loading }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-base/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-signal-emerald" />
          <span className="font-mono text-sm font-medium tracking-tight">web-nokos</span>
        </div>
        <div className="rounded-full border border-line bg-surface px-3 py-1.5">
          {loading ? (
            <span className="block h-3 w-16 animate-pulse rounded bg-surface-alt" />
          ) : (
            <span className="font-mono text-sm font-semibold tabular-nums text-ink">
              {balance?.formatted ?? '-'}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
