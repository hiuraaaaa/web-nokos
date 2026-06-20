import { LayoutGrid, ShoppingBag, History, Wallet, Settings, Zap, LogOut } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'buy', label: 'Beli Nomor', icon: ShoppingBag },
  { id: 'history', label: 'Riwayat', icon: History },
  { id: 'balance', label: 'Saldo & Topup', icon: Wallet },
  { id: 'settings', label: 'Pengaturan', icon: Settings },
];

export function Sidebar({ active, onChange, user, onLogout }) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col bg-nav-bg md:flex">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 border-b border-nav-border px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent">
          <Zap size={14} className="text-white" />
        </div>
        <span className="text-sm font-semibold tracking-tight text-white">LuminaOTP</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-nav-active font-medium text-nav-text-active'
                  : 'text-nav-text hover:bg-nav-hover hover:text-nav-text-active'
              }`}
            >
              <Icon size={16} strokeWidth={isActive ? 2 : 1.75} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="border-t border-nav-border px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
              {user?.username?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-white">{user?.username ?? 'User'}</p>
              <p className="truncate text-[11px] text-nav-text">{user?.email ?? ''}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-nav-text hover:bg-nav-hover hover:text-nav-text-active"
            title="Logout"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
