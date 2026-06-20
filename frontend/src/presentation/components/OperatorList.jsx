export function OperatorList({ operators, loading, onPick, creating }) {
  if (loading) {
    return (
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-24 animate-pulse rounded-md bg-surface-sunken" />
        ))}
      </div>
    );
  }

  if (!operators.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {operators.map((op) => (
        <button
          key={op.id}
          disabled={creating}
          onClick={() => onPick(op)}
          className="flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-1.5 text-sm capitalize text-ink transition-colors hover:border-line-strong disabled:opacity-50"
        >
          {op.image && <img src={op.image} alt="" className="h-4 w-4 rounded-full object-contain" />}
          {op.name}
        </button>
      ))}
    </div>
  );
}
