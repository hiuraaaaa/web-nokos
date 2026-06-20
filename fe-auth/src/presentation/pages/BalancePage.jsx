import { CreditCard, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { BalanceCard } from '../components/BalanceCard';

const TOPUP_AMOUNTS = [10000, 25000, 50000, 100000, 200000, 500000];

const MOCK_HISTORY = [
  { id: '1', amount: 50000, status: 'paid', method: 'QRIS', date: '20 Jun, 10:32' },
  { id: '2', amount: 100000, status: 'paid', method: 'BCA Virtual Account', date: '18 Jun, 14:15' },
  { id: '3', amount: 25000, status: 'expired', method: 'QRIS', date: '15 Jun, 09:00' },
];

function TopupStatusIcon({ status }) {
  if (status === 'paid') return <CheckCircle size={15} className="text-signal-emerald" />;
  if (status === 'pending') return <Clock size={15} className="text-signal-amber" />;
  if (status === 'expired') return <XCircle size={15} className="text-muted-2" />;
  return <AlertCircle size={15} className="text-signal-rose" />;
}

function formatRp(n) {
  return 'Rp' + n.toLocaleString('id-ID');
}

export function BalancePage({ balance, loading, error, refresh }) {
  return (
    <div className="max-w-2xl space-y-5">
      <BalanceCard
        balance={balance}
        loading={loading}
        error={error}
        onRefresh={refresh}
        onTopup={() => {}}
      />

      {/* Topup form */}
      <div className="card p-5 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-ink">Topup Saldo</h3>
          <p className="mt-0.5 text-xs text-muted">Pilih nominal atau masukkan jumlah sendiri.</p>
        </div>

        {/* Quick amounts */}
        <div className="grid grid-cols-3 gap-2">
          {TOPUP_AMOUNTS.map((amt) => (
            <button
              key={amt}
              className="rounded-md border border-line bg-surface py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:bg-accent-light hover:text-accent-text"
            >
              {formatRp(amt)}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Jumlah lain</label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">Rp</span>
              <input
                type="number"
                placeholder="0"
                min={10000}
                className="input-field pl-9"
              />
            </div>
          </div>
          <p className="mt-1 text-xs text-muted-2">Minimal Rp10.000</p>
        </div>

        {/* Payment method */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Metode Pembayaran</label>
          <select className="input-field">
            <option value="">Pilih metode...</option>
            <option value="QRIS">QRIS</option>
            <option value="BRIVA">BRI Virtual Account</option>
            <option value="BCAVA">BCA Virtual Account</option>
            <option value="BNIVA">BNI Virtual Account</option>
            <option value="MANDIRIVA">Mandiri Virtual Account</option>
          </select>
        </div>

        <button className="btn-primary w-full justify-center">
          <CreditCard size={15} className="mr-1.5" />
          Lanjut Pembayaran
        </button>
      </div>

      {/* History */}
      <div className="card overflow-hidden">
        <div className="border-b border-line px-5 py-3">
          <h3 className="text-sm font-semibold text-ink">Riwayat Topup</h3>
        </div>
        {MOCK_HISTORY.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-muted">Belum ada riwayat topup.</p>
        ) : (
          <ul className="divide-y divide-line">
            {MOCK_HISTORY.map((t) => (
              <li key={t.id} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <TopupStatusIcon status={t.status} />
                  <div>
                    <p className="text-sm font-medium text-ink">{formatRp(t.amount)}</p>
                    <p className="text-xs text-muted">{t.method} · {t.date}</p>
                  </div>
                </div>
                <span
                  className={`badge ${
                    t.status === 'paid'
                      ? 'bg-signal-emerald-bg text-signal-emerald'
                      : t.status === 'pending'
                      ? 'bg-signal-amber-bg text-signal-amber'
                      : 'bg-surface-sunken text-muted'
                  }`}
                >
                  {t.status === 'paid' ? 'Berhasil' : t.status === 'pending' ? 'Menunggu' : 'Kadaluarsa'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
