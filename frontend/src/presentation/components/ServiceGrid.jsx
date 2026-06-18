export function ServiceGrid({ services, selected, onSelect, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-surface-alt" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {services.map((service) => (
        <button
          key={service.code}
          onClick={() => onSelect(service)}
          className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-colors ${
            selected?.code === service.code
              ? 'border-signal-indigo bg-signal-indigo/10'
              : 'border-line bg-surface hover:border-signal-indigo/50'
          }`}
        >
          <img src={service.image} alt="" className="h-8 w-8 rounded-md object-contain" />
          <span className="line-clamp-1 text-xs text-ink">{service.name}</span>
        </button>
      ))}
    </div>
  );
}
