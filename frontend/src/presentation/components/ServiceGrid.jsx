import { useState } from 'react';

const PREVIEW_COUNT = 5;

export function ServiceGrid({ services, selected, onSelect, loading }) {
  const [expanded, setExpanded] = useState(false);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-surface-alt" />
        ))}
      </div>
    );
  }

  const visible = expanded ? services : services.slice(0, PREVIEW_COUNT);
  const hasMore = !expanded && services.length > PREVIEW_COUNT;

  return (
    <div className="grid grid-cols-3 gap-2">
      {visible.map((service) => (
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

      {hasMore && (
        <button
          onClick={() => setExpanded(true)}
          className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-line bg-surface p-3 text-center text-muted hover:border-signal-indigo/50"
        >
          <span className="text-lg leading-none">···</span>
          <span className="text-xs">Lihat Lainnya</span>
        </button>
      )}
    </div>
  );
}
