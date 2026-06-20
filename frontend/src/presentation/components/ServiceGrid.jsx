import { useState } from 'react';

const PREVIEW_COUNT = 8;

export function ServiceGrid({ services, selected, onSelect, loading }) {
  const [expanded, setExpanded] = useState(false);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-md bg-surface-sunken" />
        ))}
      </div>
    );
  }

  const visible = expanded ? services : services.slice(0, PREVIEW_COUNT);
  const hasMore = !expanded && services.length > PREVIEW_COUNT;

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {visible.map((service) => (
        <button
          key={service.code}
          onClick={() => onSelect(service)}
          className={`flex items-center gap-2.5 rounded-md border p-3 text-left transition-colors ${
            selected?.code === service.code
              ? 'border-ink bg-surface-sunken'
              : 'border-line bg-surface hover:border-line-strong'
          }`}
        >
          <img src={service.image} alt="" className="h-6 w-6 shrink-0 rounded-sm object-contain" />
          <span className="truncate text-sm text-ink">{service.name}</span>
        </button>
      ))}

      {hasMore && (
        <button
          onClick={() => setExpanded(true)}
          className="flex items-center justify-center gap-1.5 rounded-md border border-dashed border-line p-3 text-sm text-muted hover:border-line-strong"
        >
          Lihat lainnya
        </button>
      )}
    </div>
  );
}
