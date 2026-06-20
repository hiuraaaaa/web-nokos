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
      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div
            className="absolute inset-0 bg-ink/30"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-60 bg-surface">
            <Sidebar active={tab} onChange={handleChangeTab} />
          </div>
        </div>
      )}

      <Sidebar active={tab} onChange={handleChangeTab} />

      <div className="flex min-h-screen flex-1 flex-col">
        <TopBar
          balance={balanceState.balance}
          loading={balanceState.loading}
          active={tab}
          onMenuClick={() => setDrawerOpen(true)}
        />
        <main className="flex-1 px-4 py-5 pb-24 sm:px-6 md:pb-8">
          <div className="mx-auto max-w-5xl">
            {tab === 'dashboard' && (
              <DashboardPage balanceState={balanceState} onNavigate={handleChangeTab} />
            )}
            {tab === 'buy' && <BuyNumberPage />}
            {tab === 'history' && <HistoryPage />}
            {tab === 'balance' && <BalancePage {...balanceState} />}
            {tab === 'settings' && <SettingsPage />}
          </div>
        </main>
      </div>

      <BottomNav active={tab} onChange={handleChangeTab} />
    </div>
  );
}
