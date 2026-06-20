import { useState } from 'react';
import { Eye, EyeOff, Copy, Check } from 'lucide-react';

export function SettingsPage() {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifOtp, setNotifOtp] = useState(true);

  const apiKey = 'lna_live_8f2a91c6e0b4d7f3a52c91d0e6b8f4a7';

  const handleCopy = () => {
    navigator.clipboard?.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-ink">Pengaturan Akun</h2>
        <p className="text-sm text-muted">Kelola profil, kunci API, dan preferensi notifikasi.</p>
      </div>

      <form onSubmit={handleSave} className="card p-5">
        <h3 className="text-sm font-medium text-ink">Profil</h3>
        <p className="mt-0.5 text-xs text-muted">Informasi dasar akun kamu.</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Nama</label>
            <input type="text" defaultValue="Hiura" className="input-field" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Username</label>
            <input type="text" defaultValue="hiuraaaaa" className="input-field" disabled />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-ink">Email</label>
            <input type="email" defaultValue="hiura0012@gmail.com" className="input-field" />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
          <button type="submit" className="btn-primary">
            Simpan perubahan
          </button>
          {saved && <span className="text-sm text-signal-emerald">Tersimpan</span>}
        </div>
      </form>

      <div className="card p-5">
        <h3 className="text-sm font-medium text-ink">Kunci API</h3>
        <p className="mt-0.5 text-xs text-muted">
          Dipakai untuk mengakses LuminaOTP lewat integrasi pihak ketiga. Jangan bagikan ke siapa pun.
        </p>

        <div className="mt-3 flex items-center gap-2">
          <div className="input-field flex items-center justify-between font-mono text-xs">
            <span className="truncate">{showKey ? apiKey : '•'.repeat(32)}</span>
          </div>
          <button
            type="button"
            onClick={() => setShowKey((v) => !v)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-muted hover:bg-surface-alt"
            aria-label={showKey ? 'Sembunyikan kunci' : 'Tampilkan kunci'}
          >
            {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-muted hover:bg-surface-alt"
            aria-label="Salin kunci"
          >
            {copied ? <Check size={15} className="text-signal-emerald" /> : <Copy size={15} />}
          </button>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="text-sm font-medium text-ink">Notifikasi</h3>
        <p className="mt-0.5 text-xs text-muted">Atur kapan kamu ingin diberi tahu.</p>

        <div className="mt-4 space-y-3">
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm text-ink">OTP masuk</p>
              <p className="text-xs text-muted">Notifikasi saat kode OTP diterima.</p>
            </div>
            <input
              type="checkbox"
              checked={notifOtp}
              onChange={() => setNotifOtp((v) => !v)}
              className="h-4 w-4 rounded border-line-strong text-link"
            />
          </label>
          <div className="border-t border-line" />
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm text-ink">Ringkasan email</p>
              <p className="text-xs text-muted">Laporan transaksi bulanan ke email kamu.</p>
            </div>
            <input
              type="checkbox"
              checked={notifEmail}
              onChange={() => setNotifEmail((v) => !v)}
              className="h-4 w-4 rounded border-line-strong text-link"
            />
          </label>
        </div>
      </div>

      <div className="card border-signal-rose-bg p-5">
        <h3 className="text-sm font-medium text-signal-rose">Hapus akun</h3>
        <p className="mt-0.5 text-xs text-muted">
          Tindakan ini permanen. Semua riwayat pesanan dan saldo tersisa akan hilang.
        </p>
        <button type="button" className="btn-danger mt-3">
          Hapus akun saya
        </button>
      </div>
    </div>
  );
}
