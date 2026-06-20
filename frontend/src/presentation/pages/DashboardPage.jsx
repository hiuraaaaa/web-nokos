import { ShoppingBag, ArrowRight } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { EmptyState } from '../components/EmptyState';
import { useOrderHistory } from '../../usecases/useOrderHistory';

function formatDate(ts) {
  if (!ts) return '-';
  return new Date(ts).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function DashboardPage({ balanceState, onNavigate }) {
  const { orders, loading: ordersLoading, error: ordersError } = useOrderHistory();

  const totalOrders = orders.length;
  const completed = orders.filter((o) => o.status === 'completed').length;
  const active = orders.filter((o) => ['pending', 'received', 'expiring'].includes(o.status)).length;
  const successRate = totalOrders > 0 ? Math.round((completed / totalOrders) * 100) : 0;
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-ink">Selamat datang kembali</h2>
        <p className="text-sm text-muted">Ringkasan aktivitas akun kamu di LuminaOTP.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Saldo akun"
          value={balanceState.balance?.formatted ?? '-'}
          loading={balanceState.loading}
          sublabel="Total dana tersedia"
        />
        <StatCard
          label="Pesanan aktif"
          value={active}
          loading={ordersLoading}
          sublabel="Sedang menunggu OTP"
        />
        <StatCard
          label="Total pesanan"
          value={totalOrders}
          loading={ordersLoading}
          sublabel="Sepanjang waktu"
        />
        <StatCard
          label="Tingkat sukses"
          value={`${successRate}%`}
          loading={ordersLoading}
          sublabel="Pesanan selesai"
        />
      </div>

      <div className="card flex flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-surface-sunken text-ink">
            <ShoppingBag size={17} />
          </div>
          <div>
            <p className="text-sm font-medium text-ink">Butuh nomor baru?</p>
            <p className="text-xs text-muted">Pilih layanan, negara, dan operator dalam 3 langkah.</p>
          </div>
        </div>
        <button onClick={() => onNavigate('buy')} className="btn-primary flex items-center gap-1.5">
          Beli Nomor
          <ArrowRight size={15} />
        </button>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-ink">Pesanan terbaru</h3>
          <button
            onClick={() => onNavigate('history')}
            className="text-sm text-link hover:underline"
          >
            Lihat semua
          </button>
        </div>

        {ordersLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded-lg bg-surface-sunken" />
            ))}
          </div>
        ) : ordersError ? (
          <EmptyState title="Gagal memuat pesanan" description={ordersError} />
        ) : recentOrders.length === 0 ? (
          <EmptyState
            title="Belum ada pesanan"
            description="Pesanan nomor yang kamu buat akan muncul di sini."
          />
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-surface-alt text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-2.5 font-medium">Nomor</th>
                  <th className="px-4 py-2.5 font-medium">Layanan</th>
                  <th className="px-4 py-2.5 font-medium">Status</th>
                  <th className="px-4 py-2.5 font-medium">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recentOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td className="px-4 py-2.5 font-mono text-ink">{order.phoneNumber}</td>
                    <td className="max-w-[160px] truncate px-4 py-2.5 text-muted">
                      {order.service}
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-muted">
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
