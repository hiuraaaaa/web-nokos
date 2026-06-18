import { useState } from 'react';
import { TopBar } from './presentation/components/TopBar';
import { BottomNav } from './presentation/components/BottomNav';
import { BuyNumberPage } from './presentation/pages/BuyNumberPage';
import { HistoryPage } from './presentation/pages/HistoryPage';
import { BalancePage } from './presentation/pages/BalancePage';
import { useBalance } from './usecases/useBalance';

export default function App() {
  const [tab, setTab] = useState('buy');
  const balanceState = useBalance();

  return (
    <div className="min-h-screen bg-base">
      <TopBar balance={balanceState.balance} loading={balanceState.loading} />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-24 sm:px-6">
        {tab === 'buy' && <BuyNumberPage />}
        {tab === 'history' && <HistoryPage />}
        {tab === 'balance' && <BalancePage {...balanceState} />}
      </main>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
