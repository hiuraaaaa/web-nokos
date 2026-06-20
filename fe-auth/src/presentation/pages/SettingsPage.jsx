import { ExternalLink } from 'lucide-react';
import { useBalance } from '../../usecases/useBalance';

function InfoRow({ label, value, loading }) {
  return (
    <div className="flex items-center justify-between border-b border-line py-3 last:border-0">
      <span className="text-sm text-muted">{label}</span>
      {loading ? (
        <span className="block h-4 w-28 animate-pulse rounded bg-surface-sunken" />
      ) : (
        <span className="text-sm font-medium text-ink">{value || '-'}</span>
      )}
    </div>
  );
}

export function SettingsPage() {
  const { balance, loading, error } = useBalance();

  const fullName = [balance?.firstName, balance?.lastName].filter(Boolean).join(' ');

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-ink">Informasi Akun</h2>
        <p className="text-sm text-muted">
          Data ini ditarik langsung dari akun RumahOTP kamu, bukan disimpan di server LuminaOTP.
        </p>
      </div>

      {error && (
        <p className="rounded-md border border-signal-rose-bg bg-signal-rose-bg px-4 py-2.5 text-sm text-signal-rose">
          {error}
        </p>
      )}

      <div className="card p-5">
        <InfoRow label="Username" value={balance?.username} loading={loading} />
        <InfoRow label="Nama" value={fullName} loading={loading} />
        <InfoRow label="Email" value={balance?.email} loading={loading} />
        <InfoRow label="Saldo" value={balance?.formatted} loading={loading} />
      </div>

      <div className="card p-5">
        <h3 className="text-sm font-medium text-ink">Kelola profil & saldo</h3>
        <p className="mt-1 text-xs text-muted">
          Ubah nama, email, kata sandi, top up saldo, dan kunci API dilakukan langsung di akun
          RumahOTP — LuminaOTP hanya menampilkan datanya, bukan tempat menyimpannya.
        </p>
        <a
          href="https://www.rumahotp.io"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary mt-3 inline-flex items-center gap-1.5"
        >
          Buka RumahOTP
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
