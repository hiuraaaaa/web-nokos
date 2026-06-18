import { BalanceCard } from '../components/BalanceCard';

export function BalancePage({ balance, loading, error, refresh }) {
  return <BalanceCard balance={balance} loading={loading} error={error} onRefresh={refresh} />;
}
