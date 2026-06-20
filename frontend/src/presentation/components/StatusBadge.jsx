import { statusMeta } from '../../domain/entities/order';

const COLOR_CLASS = {
  emerald: 'bg-signal-emerald-bg text-signal-emerald',
  amber: 'bg-signal-amber-bg text-signal-amber',
  rose: 'bg-signal-rose-bg text-signal-rose',
  slate: 'bg-signal-slate-bg text-signal-slate',
};

export function StatusBadge({ status }) {
  const meta = statusMeta(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium ${COLOR_CLASS[meta.color]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {meta.label}
    </span>
  );
}
