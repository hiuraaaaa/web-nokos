import { RefreshCw } from 'lucide-react';

export function BalanceCard({ balance, loading, error, onRefresh }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">Saldo akun</p>
          {loading ? (
            <div className="mt-2 h-9 w-40 animate-pulse rounded bg-surface-sunken" />
          ) : error ? (
            <p className="mt-2 text-sm text-signal-rose">{error}</p>
          ) : (
            <p className="mt-1 font-mono text-3xl font-semibold tabular-nums text-ink">
              {balance?.formatted ?? '-'}
            </p>
          )}
          {balance?.username && (
            <p className="mt-1 text-sm text-muted">@{balance.username}</p>
          )}
        </div>
        <button onClick={onRefresh} className="btn-secondary flex items-center gap-1.5">
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>
    </div>
  );
}
