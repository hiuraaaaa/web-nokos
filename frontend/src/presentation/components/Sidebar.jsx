import { LayoutGrid, ShoppingBag, History, Wallet, Settings } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'buy', label: 'Beli Nomor', icon: ShoppingBag },
  { id: 'history', label: 'Riwayat', icon: History },
  { id: 'balance', label: 'Saldo', icon: Wallet },
  { id: 'settings', label: 'Pengaturan', icon: Settings },
];

export function Sidebar({ active, onChange }) {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-line bg-surface md:flex md:flex-col">
      <div className="flex h-14 items-center gap-2 border-b border-line px-5">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-accent text-xs font-semibold text-white">
          L
        </div>
        <span className="text-sm font-semibold tracking-tight text-ink">LuminaOTP</span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-surface-sunken font-medium text-ink'
                  : 'text-muted hover:bg-surface-alt hover:text-ink'
              }`}
            >
              <Icon size={17} strokeWidth={1.75} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-line px-5 py-4">
        <p className="text-xs text-muted-2">LuminaOTP v1.0</p>
      </div>
    </aside>
  );
}
