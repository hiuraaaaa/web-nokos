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
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-surface-alt text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-2.5 font-medium">Nomor</th>
              <th className="px-4 py-2.5 font-medium">Layanan</th>
              <th className="px-4 py-2.5 font-medium">Negara</th>
              <th className="px-4 py-2.5 font-medium">Harga</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 font-medium">Waktu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {orders.map((order) => (
              <tr key={order.orderId} className="hover:bg-surface-alt">
                <td className="whitespace-nowrap px-4 py-2.5 font-mono text-ink">
                  {order.phoneNumber}
                </td>
                <td className="max-w-[160px] truncate px-4 py-2.5 text-ink" title={order.service}>
                  {order.service}
                </td>
                <td className="max-w-[140px] truncate px-4 py-2.5 text-muted" title={order.country}>
                  {order.country}
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 font-mono text-ink">
                  {order.priceFormatted ?? '-'}
                </td>
                <td className="whitespace-nowrap px-4 py-2.5">
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
    </div>
  );
}
