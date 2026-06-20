import { ExternalLink } from 'lucide-react';
import { BalanceCard } from '../components/BalanceCard';

export function BalancePage({ balance, loading, error, refresh }) {
  return (
    <div className="max-w-2xl space-y-5">
      <BalanceCard balance={balance} loading={loading} error={error} onRefresh={refresh} />

      <div className="card p-5">
        <h3 className="text-sm font-medium text-ink">Top up saldo</h3>
        <p className="mt-1 text-xs text-muted">
          Top up dilakukan langsung di RumahOTP (transfer bank/QRIS dari dashboard mereka).
          Saldo akan otomatis ter-update di sini setelah berhasil — tekan Refresh kalau belum muncul.
        </p>
        <a
          href="https://www.rumahotp.io"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-3 inline-flex items-center gap-1.5"
        >
          Top up di RumahOTP
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
