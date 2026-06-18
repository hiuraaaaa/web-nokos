import { Smartphone } from 'lucide-react';

export function VirtualNumberIntro() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-signal-indigo/10 text-signal-indigo">
        <Smartphone size={20} />
      </div>
      <div>
        <p className="font-medium text-ink">Nomor Virtual OTP</p>
        <p className="text-xs text-muted">Sewa nomor sementara, langsung pakai buat verifikasi SMS.</p>
      </div>
    </div>
  );
}
