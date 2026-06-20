import { useState } from 'react';
import { CreditCard, Clock, CheckCircle, XCircle, AlertCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { BalanceCard } from '../components/BalanceCard';
import { useTopup } from '../../usecases/useTopup';

const TOPUP_AMOUNTS = [10000, 25000, 50000, 100000, 200000, 500000];

function formatRp(n) {
  return 'Rp' + Number(n).toLocaleString('id-ID');
}

function formatDate(ts) {
  if (!ts) return '-';
  return new Date(ts).toLocaleString('id-ID', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
  });
}

function TopupStatusIcon({ status }) {
  if (status === 'paid') return <CheckCircle size={15} className="text-signal-emerald" />;
  if (status === 'pending') return <Clock size={15} className="text-signal-amber" />;
  if (status === 'expired') return <XCircle size={15} className="text-muted-2" />;
  return <AlertCircle size={15} className="text-signal-rose" />;
}

function StatusBadge({ status }) {
  const map = {
    paid: 'bg-signal-emerald-bg text-signal-emerald',
    pending: 'bg-signal-amber-bg text-signal-amber',
    expired: 'bg-surface-sunken text-muted',
    failed: 'bg-signal-rose-bg text-signal-rose',
  };
  const label = { paid: 'Berhasil', pending: 'Menunggu', expired: 'Kadaluarsa', failed: 'Gagal' };
  return (
    <span className={`badge ${map[status] ?? 'bg-surface-sunken text-muted'}`}>
      {label[status] ?? status}
    </span>
  );
}

// Modal konfirmasi pembayaran
function PaymentModal({ topup, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4">
      <div className="w-full max-w-sm card p-6 space-y-4">
        <div>
          <h3 className="text-base font-semibold text-ink">Pembayaran Dibuat</h3>
          <p className="mt-1 text-sm text-muted">Selesaikan pembayaran untuk menambah saldo.</p>
        </div>

        <div className="rounded-md bg-surface-alt border border-line p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Nominal</span>
            <span className="font-semibold text-ink">{formatRp(topup.amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Metode</span>
            <span className="text-ink">{topup.tripayChannel ?? topup.paymentMethod}</span>
          </div>
          {topup.fee > 0 && (
            <div className="flex justify-between">
              <span className="text-muted">Biaya</span>
              <span className="text-ink">{formatRp(topup.fee)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted">Status</span>
            <StatusBadge status={topup.status} />
          </div>
        </div>

        <div className="flex gap-2">
          {topup.payUrl && (
            <a
              href={topup.payUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 justify-center gap-1.5"
            >
              <ExternalLink size={14} />
              Bayar Sekarang
            </a>
          )}
          <button onClick={onClose} className="btn-secondary flex-1 justify-center">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export function BalancePage({ balance, loading, error, refresh }) {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [pendingTopup, setPendingTopup] = useState(null);

  const {
    channels, history,
    loadingChannels, loadingHistory,
    submitting, error: topupError,
    createTopup, fetchHistory,
  } = useTopup();

  const finalAmount = selectedAmount || Number(customAmount) || 0;

  const handleSubmit = async () => {
    if (!finalAmount || finalAmount < 10000) return;
    if (!selectedMethod) return;

    try {
      const data = await createTopup(
        { amount: finalAmount, paymentMethod: selectedMethod },
        {
          onSuccess: () => {
            refresh(); // refresh saldo
            setSelectedAmount(null);
            setCustomAmount('');
          },
        }
      );
      setPendingTopup(data);
    } catch {
      // error sudah di-handle di hook
    }
  };

  return (
    <div className="max-w-2xl space-y-5">
      {pendingTopup && (
        <PaymentModal topup={pendingTopup} onClose={() => setPendingTopup(null)} />
      )}

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
              onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
              className={`rounded-md border py-2.5 text-sm font-medium transition-colors ${
                selectedAmount === amt
                  ? 'border-accent bg-accent-light text-accent-text'
                  : 'border-line bg-surface text-ink hover:border-accent hover:bg-accent-light hover:text-accent-text'
              }`}
            >
              {formatRp(amt)}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Jumlah lain</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">Rp</span>
            <input
              type="number"
              placeholder="0"
              min={10000}
              className="input-field pl-9"
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
            />
          </div>
          <p className="mt-1 text-xs text-muted-2">Minimal Rp10.000</p>
        </div>

        {/* Payment method */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Metode Pembayaran</label>
          <select
            className="input-field"
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            disabled={loadingChannels}
          >
            <option value="">Pilih metode...</option>
            {channels.map((ch) => (
              <option key={ch.code} value={ch.code}>{ch.name}</option>
            ))}
          </select>
        </div>

        {topupError && (
          <p className="rounded-md bg-signal-rose-bg px-3 py-2 text-sm text-signal-rose">
            {topupError}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting || !finalAmount || finalAmount < 10000 || !selectedMethod}
          className="btn-primary w-full justify-center"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Memproses...
            </span>
          ) : (
            <>
              <CreditCard size={15} className="mr-1.5" />
              Lanjut Pembayaran {finalAmount >= 10000 ? `• ${formatRp(finalAmount)}` : ''}
            </>
          )}
        </button>
      </div>

      {/* History */}
      <div className="card overflow-hidden">
        <div className="border-b border-line px-5 py-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-ink">Riwayat Topup</h3>
          <button onClick={fetchHistory} className="text-xs text-muted hover:text-ink flex items-center gap-1">
            <RefreshCw size={11} />
            Refresh
          </button>
        </div>

        {loadingHistory ? (
          <div className="space-y-2 p-4">
            {[1,2,3].map(i => (
              <div key={i} className="h-12 animate-pulse rounded bg-surface-sunken" />
            ))}
          </div>
        ) : history.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-muted">Belum ada riwayat topup.</p>
        ) : (
          <ul className="divide-y divide-line">
            {history.map((t) => (
              <li key={t.id} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <TopupStatusIcon status={t.status} />
                  <div>
                    <p className="text-sm font-medium text-ink">{formatRp(t.amount)}</p>
                    <p className="text-xs text-muted">
                      {t.tripay_channel ?? t.paymentMethod ?? '-'} · {formatDate(t.created_at)}
                    </p>
                  </div>
                </div>
                <StatusBadge status={t.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
