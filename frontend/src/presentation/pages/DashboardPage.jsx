import { ShoppingBag, ArrowRight, Zap } from 'lucide-react';
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

export function DashboardPage({ balanceState, onNavigate, user }) {
  const { orders, loading: ordersLoading, error: ordersError } = useOrderHistory();

  const totalOrders = orders.length;
  const completed = orders.filter((o) => o.status === 'completed').length;
  const active = orders.filter((o) => ['pending', 'received', 'expiring'].includes(o.status)).length;
  const successRate = totalOrders > 0 ? Math.round((completed / totalOrders) * 100) : 0;
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-ink">
            Halo, {user?.username ?? 'User'} 👋
          </h2>
          <p className="mt-0.5 text-sm text-muted">Ini ringkasan aktivitas akun kamu hari ini.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Saldo"
          value={balanceState.balance?.formatted ?? 'Rp0'}
          loading={balanceState.loading}
          sublabel="Dana tersedia"
          accent
        />
        <StatCard
          label="Pesanan Aktif"
          value={active}
          loading={ordersLoading}
          sublabel="Menunggu OTP"
        />
        <StatCard
          label="Total Pesanan"
          value={totalOrders}
          loading={ordersLoading}
          sublabel="Sepanjang waktu"
        />
        <StatCard
          label="Sukses Rate"
          value={`${successRate}%`}
          loading={ordersLoading}
          sublabel="Pesanan selesai"
        />
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between gap-4 rounded-lg border border-accent-light bg-accent-light px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent">
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-ink">Butuh nomor baru?</p>
            <p className="text-xs text-muted">Pilih layanan, negara, dan operator dalam 3 langkah.</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('buy')}
          className="btn-primary shrink-0 gap-1.5"
        >
          Beli Nomor
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Recent orders */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-ink">Pesanan Terbaru</h3>
          <button
            onClick={() => onNavigate('history')}
            className="text-xs font-medium text-accent hover:underline"
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
          <div className="card px-5 py-10 text-center">
            <ShoppingBag size={24} className="mx-auto mb-2 text-muted-2" />
            <p className="text-sm font-medium text-ink">Belum ada pesanan</p>
            <p className="mt-1 text-xs text-muted">Pesanan nomor yang kamu buat akan muncul di sini.</p>
            <button onClick={() => onNavigate('buy')} className="btn-primary mt-4">
              Beli Nomor Pertama
            </button>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-surface-alt">
                <tr>
                  <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-muted">Nomor</th>
                  <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-muted">Layanan</th>
                  <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-muted">Status</th>
                  <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-muted">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recentOrders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-surface-alt">
                    <td className="px-4 py-3 font-mono text-sm text-ink">{order.phoneNumber}</td>
                    <td className="max-w-[140px] truncate px-4 py-3 text-sm text-muted">{order.service}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-muted">
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
