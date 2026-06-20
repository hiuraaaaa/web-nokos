import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function CountryList({ countries, loading, onPick }) {
  const [expanded, setExpanded] = useState(null);

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse rounded-md bg-surface-sunken" />
        ))}
      </div>
    );
  }

  if (!countries.length) return null;

  return (
    <div className="card divide-y divide-line">
      {countries.map((country) => {
        const isOpen = expanded === country.numberId;
        return (
          <div key={country.numberId}>
            <button
              onClick={() => setExpanded(isOpen ? null : country.numberId)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-surface-alt"
            >
              <div className="flex items-center gap-3">
                <img src={country.image} alt="" className="h-5 w-5 rounded-sm object-contain" />
                <div>
                  <p className="truncate text-sm font-medium text-ink">{country.name}</p>
                  <p className="font-mono text-xs text-muted">{country.prefix}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted">
                <span>{country.stockTotal} stok</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </button>

            {isOpen && (
              <div className="space-y-1 bg-surface-alt p-2">
                {country.pricelist.map((p) => (
                  <button
                    key={p.providerId}
                    disabled={!p.available}
                    onClick={() => onPick(country, p)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors enabled:hover:bg-surface disabled:opacity-40"
                  >
                    <span className="text-muted">Stok {p.stock}</span>
                    <span className="font-mono font-medium text-ink">{p.priceFormatted}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
