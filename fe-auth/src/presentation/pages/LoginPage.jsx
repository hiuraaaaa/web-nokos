import { useState } from 'react';
import { Zap, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

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
      // AuthContext update user → App render dashboard otomatis
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-alt px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
            <Zap size={20} className="text-white" />
          </div>
          <h1 className="mt-3 text-xl font-bold text-ink">LuminaOTP</h1>
          <p className="mt-1 text-sm text-muted">Masuk ke akun kamu</p>
        </div>

        <div className="card p-6">
          {error && (
            <div className="mb-4 rounded-md border border-signal-rose-bg bg-signal-rose-bg px-3 py-2.5 text-sm text-signal-rose">
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
              <label className="mb-1.5 block text-xs font-medium text-ink">Password</label>
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
              className="btn-primary w-full justify-center"
            >
              {loading ? 'Masuk...' : 'Masuk'}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-sm text-muted">
          Belum punya akun?{' '}
          <button
            onClick={onGoRegister}
            className="font-medium text-accent hover:underline"
          >
            Daftar sekarang
          </button>
        </p>
      </div>
    </div>
  );
}
