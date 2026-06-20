export function SelectionSummary({ icon, label, sublabel, onChange }) {
  return (
    <div className="card flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3 overflow-hidden">
        {icon}
        <div className="overflow-hidden">
          <p className="truncate text-sm font-medium text-ink">{label}</p>
          {sublabel && <p className="truncate text-xs text-muted">{sublabel}</p>}
        </div>
      </div>
      <button onClick={onChange} className="shrink-0 text-sm font-medium text-link hover:underline">
        Ubah
      </button>
    </div>
  );
}
