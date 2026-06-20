const STATUS_MAP = {
  pending:   { label: 'Menunggu',  cls: 'bg-signal-amber-bg text-signal-amber' },
  received:  { label: 'OTP Masuk', cls: 'bg-signal-emerald-bg text-signal-emerald' },
  completed: { label: 'Selesai',   cls: 'bg-signal-emerald-bg text-signal-emerald' },
  expiring:  { label: 'Hampir exp',cls: 'bg-signal-amber-bg text-signal-amber' },
  expired:   { label: 'Kadaluarsa',cls: 'bg-signal-slate-bg text-signal-slate' },
  cancelled: { label: 'Dibatalkan',cls: 'bg-signal-rose-bg text-signal-rose' },
};

export function StatusBadge({ status }) {
  const { label, cls } = STATUS_MAP[status] ?? {
    label: status,
    cls: 'bg-surface-sunken text-muted',
  };
  return (
    <span className={`badge ${cls}`}>{label}</span>
  );
}
