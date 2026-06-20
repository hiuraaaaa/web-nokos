import { useMemo, useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { useOrderHistory } from '../../usecases/useOrderHistory';
import { HistoryTable } from '../components/HistoryTable';
import { EmptyState } from '../components/EmptyState';

const STATUS_FILTERS = [
  { id: 'all', label: 'Semua' },
  { id: 'pending', label: 'Menunggu' },
  { id: 'completed', label: 'Selesai' },
  { id: 'canceled', label: 'Dibatalkan' },
];

export function HistoryPage() {
  const { orders, loading, error, refresh } = useOrderHistory();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        o.phoneNumber?.toLowerCase().includes(q) ||
        o.service?.toLowerCase().includes(q) ||
        o.country?.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [orders, query, statusFilter]);

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded-lg bg-surface-sunken" />
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
          <button onClick={refresh} className="btn-secondary">
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
        description="Pesanan nomor yang kamu buat akan muncul di sini."
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 sm:max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nomor, layanan, negara..."
              className="input-field pl-9"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field w-auto"
          >
            {STATUS_FILTERS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
        <button onClick={refresh} className="btn-secondary flex items-center gap-1.5 self-start">
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Tidak ada hasil"
          description="Coba ubah kata kunci pencarian atau filter status."
        />
      ) : (
        <>
          <HistoryTable orders={filtered} />
          <p className="text-xs text-muted">
            Menampilkan {filtered.length} dari {orders.length} pesanan
          </p>
        </>
      )}
    </div>
  );
}
