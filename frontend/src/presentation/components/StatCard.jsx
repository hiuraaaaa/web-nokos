export function StatCard({ label, value, sublabel, loading, trend }) {
  return (
    <div className="card p-4">
      <p className="text-xs text-muted">{label}</p>
      {loading ? (
        <div className="mt-2 h-7 w-20 animate-pulse rounded bg-surface-sunken" />
      ) : (
        <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-ink">{value}</p>
      )}
      {sublabel && !loading && (
        <p className="mt-1 text-xs text-muted-2">
          {sublabel}
          {trend && (
            <span className={trend > 0 ? 'ml-1.5 text-signal-emerald' : trend < 0 ? 'ml-1.5 text-signal-rose' : ''}>
              {trend > 0 ? `+${trend}%` : trend < 0 ? `${trend}%` : ''}
            </span>
          )}
        </p>
      )}
    </div>
  );
}
