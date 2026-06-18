import { useBalance } from '../../usecases/useBalance';
import { BalanceCard } from '../components/BalanceCard';

export function BalancePage() {
  const { balance, loading, error, refresh } = useBalance();
  return <BalanceCard balance={balance} loading={loading} error={error} onRefresh={refresh} />;
}
