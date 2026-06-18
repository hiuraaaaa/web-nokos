export function BalanceCard({ balance, loading, error, onRefresh }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">Saldo akun</p>
          {loading ? (
            <div className="mt-2 h-9 w-40 animate-pulse rounded bg-surface-alt" />
          ) : error ? (
            <p className="mt-2 text-sm text-signal-rose">{error}</p>
          ) : (
            <p className="mt-1 font-mono text-3xl font-semibold tabular-nums">
              {balance?.formatted ?? '-'}
            </p>
          )}
          {balance?.username && (
            <p className="mt-1 text-sm text-muted">@{balance.username}</p>
          )}
        </div>
        <button
          onClick={onRefresh}
          className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-signal-indigo hover:text-ink"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
