export const ORDER_STATUS = {
  pending: { label: 'Menunggu OTP', color: 'amber' },
  received: { label: 'OTP Masuk', color: 'emerald' },
  completed: { label: 'Selesai', color: 'emerald' },
  canceled: { label: 'Dibatalkan', color: 'rose' },
  expiring: { label: 'Hampir Kadaluarsa', color: 'amber' },
  expired: { label: 'Kadaluarsa', color: 'rose' },
};

export const ACTIVE_STATUSES = ['pending', 'received', 'expiring'];

export function statusMeta(status) {
  return ORDER_STATUS[status] || { label: status, color: 'slate' };
}

export function isActive(order) {
  return order && ACTIVE_STATUSES.includes(order.status);
}

export function secondsUntilExpiry(order) {
  if (!order?.expiredAt) return null;
  return Math.max(0, Math.floor((order.expiredAt - Date.now()) / 1000));
}

export function formatCountdown(seconds) {
  if (seconds === null) return '--:--';
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}
