import { useEffect, useState } from 'react';

// Taruh file gambar di folder public/banners/, lalu daftarkan path-nya di sini.
// Contoh: const BANNERS = ['/banners/promo-1.jpg', '/banners/promo-2.jpg'];
const BANNERS = [];

export function PromoBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (BANNERS.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % BANNERS.length), 4000);
    return () => clearInterval(id);
  }, []);

  if (BANNERS.length === 0) {
    return (
      <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-line bg-surface">
        <p className="px-6 text-center text-xs text-muted">
          Banner promosi belum ada — taruh gambar di{' '}
          <code className="font-mono text-ink">public/banners/</code>, lalu daftarkan path-nya
          di <code className="font-mono text-ink">PromoBanner.jsx</code>
        </p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="relative h-24">
        {BANNERS.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      {BANNERS.length > 1 && (
        <div className="flex justify-center gap-1.5 border-t border-line bg-surface-alt py-2">
          {BANNERS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-5 bg-ink' : 'w-1.5 bg-line-strong'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
