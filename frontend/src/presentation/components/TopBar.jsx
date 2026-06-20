import { Menu, Bell } from 'lucide-react';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  buy: 'Beli Nomor',
  history: 'Riwayat Pesanan',
  balance: 'Saldo',
  settings: 'Pengaturan Akun',
};

export function TopBar({ balance, loading, active, onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center border-b border-line bg-surface px-4 sm:px-6">
      <button
        onClick={onMenuClick}
        className="mr-3 flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-surface-alt md:hidden"
        aria-label="Buka menu"
      >
        <Menu size={19} />
      </button>

      <h1 className="text-[15px] font-medium text-ink">{PAGE_TITLES[active] ?? 'LuminaOTP'}</h1>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-1.5 rounded-md border border-line bg-surface-alt px-3 py-1.5 sm:flex">
          <span className="text-xs text-muted">Saldo</span>
          {loading ? (
            <span className="block h-3 w-14 animate-pulse rounded bg-line" />
          ) : (
            <span className="font-mono text-xs font-semibold tabular-nums text-ink">
              {balance?.formatted ?? '-'}
            </span>
          )}
        </div>
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
