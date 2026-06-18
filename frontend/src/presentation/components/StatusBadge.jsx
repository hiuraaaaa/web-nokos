import { statusMeta } from '../../domain/entities/order';

const COLOR_CLASS = {
  emerald: 'bg-signal-emerald/10 text-signal-emerald border-signal-emerald/30',
  amber: 'bg-signal-amber/10 text-signal-amber border-signal-amber/30',
  rose: 'bg-signal-rose/10 text-signal-rose border-signal-rose/30',
  slate: 'bg-surface-alt text-muted border-line',
};

export function StatusBadge({ status }) {
  const meta = statusMeta(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${COLOR_CLASS[meta.color]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {meta.label}
    </span>
  );
}
