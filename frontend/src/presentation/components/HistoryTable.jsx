import { StatusBadge } from './StatusBadge';

function formatDate(ts) {
  if (!ts) return '-';
  return new Date(ts).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function HistoryTable({ orders }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
          <tr>
            <th className="px-4 py-3">Nomor</th>
            <th className="px-4 py-3">Layanan</th>
            <th className="px-4 py-3">Harga</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Waktu</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {orders.map((order) => (
            <tr key={order.orderId} className="bg-base/40">
              <td className="px-4 py-3 font-mono text-ink">{order.phoneNumber}</td>
              <td className="px-4 py-3 text-muted">
                {order.service} &middot; {order.country}
              </td>
              <td className="px-4 py-3 font-mono text-ink">{order.priceFormatted ?? '-'}</td>
              <td className="px-4 py-3">
                <StatusBadge status={order.status} />
              </td>
              <td className="px-4 py-3 text-muted">{formatDate(order.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
