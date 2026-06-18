import { useState } from 'react';
import { Navbar } from './presentation/components/Navbar';
import { BuyNumberPage } from './presentation/pages/BuyNumberPage';
import { HistoryPage } from './presentation/pages/HistoryPage';
import { BalancePage } from './presentation/pages/BalancePage';

const PAGES = {
  buy: BuyNumberPage,
  history: HistoryPage,
  balance: BalancePage,
};

export default function App() {
  const [tab, setTab] = useState('buy');
  const Page = PAGES[tab];

  return (
    <div className="min-h-screen bg-base">
      <Navbar active={tab} onChange={setTab} />
      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <Page />
      </main>
    </div>
  );
}
