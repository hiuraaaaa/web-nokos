export function StatCard({ label, value, sublabel, loading, accent }) {
  return (
    <div className="card p-4">
      <p className="text-xs font-medium text-muted">{label}</p>
      {loading ? (
        <div className="mt-2 h-7 w-24 animate-pulse rounded bg-surface-sunken" />
      ) : (
        <p className={`mt-1 text-2xl font-bold tabular-nums ${accent ? 'text-accent' : 'text-ink'}`}>
          {value}
        </p>
      )}
      {sublabel && <p className="mt-1 text-xs text-muted-2">{sublabel}</p>}
    </div>
  );
}
