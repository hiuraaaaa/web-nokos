import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';

import { Sidebar } from './presentation/components/Sidebar';
import { TopBar } from './presentation/components/TopBar';
import { BottomNav } from './presentation/components/BottomNav';
import { DashboardPage } from './presentation/pages/DashboardPage';
import { BuyNumberPage } from './presentation/pages/BuyNumberPage';
import { HistoryPage } from './presentation/pages/HistoryPage';
import { BalancePage } from './presentation/pages/BalancePage';
import { SettingsPage } from './presentation/pages/SettingsPage';
import { LoginPage } from './presentation/pages/LoginPage';
import { RegisterPage } from './presentation/pages/RegisterPage';
import { useBalance } from './usecases/useBalance';

function AppShell() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const balanceState = useBalance();

  // Kalau token expired, auth:logout event akan di-dispatch dari apiClient
  useEffect(() => {
    const handler = () => logout();
    window.addEventListener('auth:logout', handler);
    return () => window.removeEventListener('auth:logout', handler);
  }, [logout]);

  const handleChangeTab = (id) => {
    setTab(id);
    setDrawerOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-surface-alt">
      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-60 shadow-dropdown">
            <Sidebar active={tab} onChange={handleChangeTab} user={user} onLogout={logout} />
          </div>
        </div>
      )}

      <Sidebar active={tab} onChange={handleChangeTab} user={user} onLogout={logout} />

      <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
        <TopBar
          balance={balanceState.balance}
          loading={balanceState.loading}
          active={tab}
          onMenuClick={() => setDrawerOpen(true)}
          onNavigate={handleChangeTab}
        />
        <main className="flex-1 overflow-auto px-4 py-5 pb-24 sm:px-6 md:pb-8">
          <div className="mx-auto max-w-5xl">
            {tab === 'dashboard' && (
              <DashboardPage balanceState={balanceState} onNavigate={handleChangeTab} user={user} />
            )}
            {tab === 'buy' && <BuyNumberPage />}
            {tab === 'history' && <HistoryPage />}
            {tab === 'balance' && <BalancePage {...balanceState} />}
            {tab === 'settings' && <SettingsPage user={user} onLogout={logout} />}
          </div>
        </main>
      </div>

      <BottomNav active={tab} onChange={handleChangeTab} />
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();
  const [authPage, setAuthPage] = useState('login'); // 'login' | 'register'

  // Loading awal — cek token
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-alt">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent" />
          <p className="text-sm text-muted">Memuat...</p>
        </div>
      </div>
    );
  }

  // Belum login
  if (!user) {
    if (authPage === 'register') {
      return <RegisterPage onGoLogin={() => setAuthPage('login')} />;
    }
    return <LoginPage onGoRegister={() => setAuthPage('register')} />;
  }

  // Sudah login
  return <AppShell />;
}
