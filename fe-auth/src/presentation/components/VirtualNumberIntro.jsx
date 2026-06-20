import { Smartphone } from 'lucide-react';

export function VirtualNumberIntro() {
  return (
    <div className="flex items-center gap-3 rounded-md border border-line bg-surface px-4 py-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-surface-sunken text-ink">
        <Smartphone size={17} />
      </div>
      <div>
        <p className="text-sm font-medium text-ink">Nomor Virtual OTP</p>
        <p className="text-xs text-muted">Sewa nomor sementara, langsung pakai buat verifikasi SMS.</p>
      </div>
    </div>
  );
}
