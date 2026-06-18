export function SelectionSummary({ icon, label, sublabel, onChange }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-sm font-medium text-ink">{label}</p>
          {sublabel && <p className="text-xs text-muted">{sublabel}</p>}
        </div>
      </div>
      <button onClick={onChange} className="text-sm font-medium text-signal-indigo">
        Ubah
      </button>
    </div>
  );
}
