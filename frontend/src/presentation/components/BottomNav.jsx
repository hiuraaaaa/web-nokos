import { LayoutGrid, ShoppingBag, History, Wallet, Settings } from 'lucide-react';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'buy', label: 'Beli', icon: ShoppingBag },
  { id: 'history', label: 'Riwayat', icon: History },
  { id: 'balance', label: 'Saldo', icon: Wallet },
  { id: 'settings', label: 'Setelan', icon: Settings },
];

export function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="relative flex flex-1 flex-col items-center gap-1 py-2.5"
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-accent" />
              )}
              <Icon
                size={19}
                strokeWidth={isActive ? 2.2 : 1.75}
                className={isActive ? 'text-accent' : 'text-muted-2'}
              />
              <span
                className={`text-[10px] font-medium ${isActive ? 'text-accent' : 'text-muted-2'}`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
