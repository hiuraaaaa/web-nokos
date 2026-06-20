import { Menu, Bell, Plus } from 'lucide-react';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  buy: 'Beli Nomor',
  history: 'Riwayat Pesanan',
  balance: 'Saldo & Topup',
  settings: 'Pengaturan Akun',
};

export function TopBar({ balance, loading, active, onMenuClick, onNavigate }) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center border-b border-line bg-surface px-4 sm:px-6">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="mr-3 flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-surface-alt md:hidden"
        aria-label="Buka menu"
      >
        <Menu size={18} />
      </button>

      <h1 className="text-[15px] font-semibold text-ink">{PAGE_TITLES[active] ?? 'LuminaOTP'}</h1>

      <div className="ml-auto flex items-center gap-2">
        {/* Saldo chip */}
        <div className="hidden items-center gap-2 rounded-md border border-line bg-surface-alt px-3 py-1.5 sm:flex">
          <span className="text-xs text-muted">Saldo</span>
          {loading ? (
            <span className="block h-3 w-16 animate-pulse rounded bg-line" />
          ) : (
            <span className="font-mono text-xs font-semibold tabular-nums text-ink">
              {balance?.formatted ?? 'Rp0'}
            </span>
          )}
        </div>

        {/* Topup button */}
        <button
          onClick={() => onNavigate?.('balance')}
          className="hidden items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-hover sm:flex"
        >
          <Plus size={13} />
          Topup
        </button>

        <button
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-surface-alt"
          aria-label="Notifikasi"
        >
          <Bell size={17} />
        </button>
      </div>
    </header>
  );
}
