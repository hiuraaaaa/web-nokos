import { useState } from 'react';

export function CountryList({ countries, loading, onPick }) {
  const [expanded, setExpanded] = useState(null);

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse rounded-xl bg-surface-alt" />
        ))}
      </div>
    );
  }

  if (!countries.length) return null;

  return (
    <div className="space-y-2">
      {countries.map((country) => {
        const isOpen = expanded === country.numberId;
        return (
          <div key={country.numberId} className="rounded-xl border border-line bg-surface">
            <button
              onClick={() => setExpanded(isOpen ? null : country.numberId)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
            >
              <div className="flex items-center gap-3">
                <img src={country.image} alt="" className="h-6 w-6 rounded-sm object-contain" />
                <div>
                  <p className="text-sm font-medium text-ink">{country.name}</p>
                  <p className="font-mono text-xs text-muted">{country.prefix}</p>
                </div>
              </div>
              <span className="text-xs text-muted">
                {country.stockTotal} stok &middot; {isOpen ? 'tutup' : 'lihat harga'}
              </span>
            </button>

            {isOpen && (
              <div className="space-y-1 border-t border-line p-2">
                {country.pricelist.map((p) => (
                  <button
                    key={p.providerId}
                    disabled={!p.available}
                    onClick={() => onPick(country, p)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors enabled:hover:bg-surface-alt disabled:opacity-40"
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
