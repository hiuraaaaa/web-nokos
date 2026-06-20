import { useState } from 'react';
import { BalanceCard } from '../components/BalanceCard';

const QUICK_AMOUNTS = [25000, 50000, 100000, 250000];

function formatRupiah(n) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
}

export function BalancePage({ balance, loading, error, refresh }) {
  const [amount, setAmount] = useState(50000);

  return (
    <div className="max-w-2xl space-y-5">
      <BalanceCard balance={balance} loading={loading} error={error} onRefresh={refresh} />

      <div className="card p-5">
        <h3 className="text-sm font-medium text-ink">Top up saldo</h3>
        <p className="mt-0.5 text-xs text-muted">Pilih nominal atau masukkan jumlah lain.</p>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {QUICK_AMOUNTS.map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt)}
              className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                amount === amt
                  ? 'border-ink bg-surface-sunken text-ink'
                  : 'border-line text-muted hover:border-line-strong'
              }`}
            >
              {formatRupiah(amt)}
            </button>
          ))}
        </div>

        <div className="mt-3">
          <label className="mb-1.5 block text-sm font-medium text-ink">Jumlah lain</label>
          <input
            type="number"
            min={10000}
            step={5000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="input-field"
          />
        </div>

        <button className="btn-primary mt-4 w-full sm:w-auto">
          Lanjut ke pembayaran
        </button>
      </div>
    </div>
  );
}
