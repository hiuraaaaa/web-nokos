const TABS = [
  { id: 'buy', label: 'Beli Nomor' },
  { id: 'history', label: 'Riwayat' },
  { id: 'balance', label: 'Saldo' },
];

export function Navbar({ active, onChange }) {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-base/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-signal-emerald" />
          <span className="font-mono text-sm font-medium tracking-tight">web-nokos</span>
        </div>
        <nav className="flex gap-1 rounded-full border border-line bg-surface p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                active === tab.id
                  ? 'bg-signal-indigo text-white'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
