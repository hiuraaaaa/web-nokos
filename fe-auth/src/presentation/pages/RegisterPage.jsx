import { useState } from 'react';
import { Zap, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function RegisterPage({ onGoLogin }) {
  const { register } = useAuth();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }
    setLoading(true);
    try {
      await register(form);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-alt px-4">
        <div className="w-full max-w-sm text-center">
          <div className="card p-8">
            <CheckCircle size={36} className="mx-auto text-signal-emerald" />
            <h2 className="mt-3 text-base font-semibold text-ink">Akun berhasil dibuat!</h2>
            <p className="mt-1 text-sm text-muted">Silakan login dengan email dan password kamu.</p>
            <button onClick={onGoLogin} className="btn-primary mt-5 w-full justify-center">
              Masuk Sekarang
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-alt px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
            <Zap size={20} className="text-white" />
          </div>
          <h1 className="mt-3 text-xl font-bold text-ink">LuminaOTP</h1>
          <p className="mt-1 text-sm text-muted">Buat akun baru</p>
        </div>

        <div className="card p-6">
          {error && (
            <div className="mb-4 rounded-md border border-signal-rose-bg bg-signal-rose-bg px-3 py-2.5 text-sm text-signal-rose">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink">Username</label>
              <input
                type="text"
                autoComplete="username"
                placeholder="username kamu"
                className="input-field"
                value={form.username}
                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                required
              />
            </div>

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
              <label className="mb-1.5 block text-xs font-medium text-ink">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Min. 6 karakter"
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
              className="btn-primary w-full justify-center"
            >
              {loading ? 'Mendaftar...' : 'Daftar'}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-sm text-muted">
          Sudah punya akun?{' '}
          <button
            onClick={onGoLogin}
            className="font-medium text-accent hover:underline"
          >
            Masuk
          </button>
        </p>
      </div>
    </div>
  );
}
