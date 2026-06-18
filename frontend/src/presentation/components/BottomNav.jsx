import { ShoppingBag, History, Wallet } from 'lucide-react';

const TABS = [
  { id: 'buy', label: 'Beli Nomor', icon: ShoppingBag },
  { id: 'history', label: 'Riwayat', icon: History },
  { id: 'balance', label: 'Saldo', icon: Wallet },
];

export function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-3xl">
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
                <span className="absolute top-0 h-0.5 w-8 rounded-full bg-signal-indigo" />
              )}
              <Icon
                size={20}
                strokeWidth={isActive ? 2.25 : 1.75}
                className={isActive ? 'text-signal-indigo' : 'text-muted'}
              />
              <span className={`text-xs ${isActive ? 'font-medium text-ink' : 'text-muted'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
