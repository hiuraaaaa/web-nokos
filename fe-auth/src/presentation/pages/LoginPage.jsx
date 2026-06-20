import { useState } from 'react';
import { Zap, Eye, EyeOff, ShieldCheck, Clock, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const FEATURES = [
  { icon: Globe, text: 'Nomor dari 100+ negara' },
  { icon: ShieldCheck, text: 'OTP real & terverifikasi' },
  { icon: Clock, text: 'Aktif dalam hitungan detik' },
];

export function LoginPage({ onGoRegister }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel - branding (desktop only) */}
      <div className="hidden w-[420px] shrink-0 flex-col justify-between bg-nav-bg px-10 py-12 lg:flex">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-base font-semibold text-white">LuminaOTP</span>
        </div>

        {/* Value prop */}
        <div>
          <h2 className="text-2xl font-bold leading-snug text-white">
            Virtual number<br />untuk verifikasi OTP
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-nav-text">
            Beli nomor sementara dari ratusan negara untuk keperluan registrasi dan verifikasi akun online.
          </p>

          <ul className="mt-8 space-y-3">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-nav-hover">
                  <Icon size={14} className="text-accent" />
                </div>
                <span className="text-sm text-nav-text">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-nav-text">© 2025 LuminaOTP. All rights reserved.</p>
      </div>

      {/* Right panel - form */}
      <div className="flex flex-1 flex-col items-center justify-center bg-surface-alt px-5 py-10">
        {/* Mobile logo */}
        <div className="mb-8 flex flex-col items-center lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
            <Zap size={20} className="text-white" />
          </div>
          <h1 className="mt-3 text-xl font-bold text-ink">LuminaOTP</h1>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-ink">Masuk ke akun</h2>
            <p className="mt-1 text-sm text-muted">Belum punya akun?{' '}
              <button onClick={onGoRegister} className="font-medium text-accent hover:underline">
                Daftar sekarang
              </button>
            </p>
          </div>

          <div className="card p-5">
            {error && (
              <div className="mb-4 rounded-md bg-signal-rose-bg px-3 py-2.5 text-sm text-signal-rose">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink">Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="kamu@email.com"
                  className="input-field"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-medium text-ink">Password</label>
                </div>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="input-field pr-10"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-2 hover:text-muted"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-2.5"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Masuk...
                  </span>
                ) : 'Masuk'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
