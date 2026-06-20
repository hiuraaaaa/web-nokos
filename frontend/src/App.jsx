import { useState } from 'react';
import { Sidebar } from './presentation/components/Sidebar';
import { TopBar } from './presentation/components/TopBar';
import { BottomNav } from './presentation/components/BottomNav';
import { DashboardPage } from './presentation/pages/DashboardPage';
import { BuyNumberPage } from './presentation/pages/BuyNumberPage';
import { HistoryPage } from './presentation/pages/HistoryPage';
import { BalancePage } from './presentation/pages/BalancePage';
import { SettingsPage } from './presentation/pages/SettingsPage';
import { useBalance } from './usecases/useBalance';

// Mock user — nanti ganti dari auth context
const MOCK_USER = { username: 'hiuraaaaa', email: 'user@example.com' };

export default function App() {
  const [tab, setTab] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const balanceState = useBalance();

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
            <Sidebar active={tab} onChange={handleChangeTab} user={MOCK_USER} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <Sidebar active={tab} onChange={handleChangeTab} user={MOCK_USER} />

      {/* Main content */}
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
              <DashboardPage
                balanceState={balanceState}
                onNavigate={handleChangeTab}
                user={MOCK_USER}
              />
            )}
            {tab === 'buy' && <BuyNumberPage />}
            {tab === 'history' && <HistoryPage />}
            {tab === 'balance' && <BalancePage {...balanceState} />}
            {tab === 'settings' && <SettingsPage />}
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <BottomNav active={tab} onChange={handleChangeTab} />
    </div>
  );
}
