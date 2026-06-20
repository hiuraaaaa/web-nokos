import { RefreshCw, TrendingUp, Plus } from 'lucide-react';

export function BalanceCard({ balance, loading, error, onRefresh, onTopup }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-card">
      {/* Header strip */}
      <div className="border-b border-line bg-surface-alt px-5 py-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">Saldo Akun</span>
        <button
          onClick={onRefresh}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-ink"
        >
          <RefreshCw size={12} />
          Refresh
        </button>
      </div>

      <div className="px-5 py-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            {loading ? (
              <div className="mt-1 h-10 w-44 animate-pulse rounded bg-surface-sunken" />
            ) : error ? (
              <p className="text-sm text-signal-rose">{error}</p>
            ) : (
              <p className="font-mono text-4xl font-bold tabular-nums text-ink">
                {balance?.formatted ?? 'Rp0'}
              </p>
            )}
            {balance?.username && (
              <p className="mt-1.5 flex items-center gap-1 text-sm text-muted">
                <TrendingUp size={12} />
                @{balance.username}
              </p>
            )}
          </div>

          <button
            onClick={onTopup}
            className="btn-primary gap-1.5 shrink-0"
          >
            <Plus size={15} />
            Topup Saldo
          </button>
        </div>
      </div>
    </div>
  );
}
