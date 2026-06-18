import { useOrderHistory } from '../../usecases/useOrderHistory';
import { HistoryTable } from '../components/HistoryTable';
import { EmptyState } from '../components/EmptyState';

export function HistoryPage() {
  const { orders, loading, error, refresh } = useOrderHistory();

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded-xl bg-surface-alt" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Riwayat gagal dimuat"
        description={error}
        action={
          <button
            onClick={refresh}
            className="rounded-lg border border-line px-3 py-1.5 text-sm hover:border-signal-indigo"
          >
            Coba lagi
          </button>
        }
      />
    );
  }

  if (!orders.length) {
    return (
      <EmptyState
        title="Belum ada pesanan"
        description="Pesanan nomor yang kamu buat bakal muncul di sini."
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button onClick={refresh} className="text-sm text-muted hover:text-ink">
          Refresh
        </button>
      </div>
      <HistoryTable orders={orders} />
    </div>
  );
}
