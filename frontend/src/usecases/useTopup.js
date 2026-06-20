import { useCallback, useEffect, useState } from 'react';
import { nokosRepository } from '../infrastructure/http/nokosRepository';

export function useTopup() {
  const [channels, setChannels] = useState([]);
  const [history, setHistory] = useState([]);
  const [loadingChannels, setLoadingChannels] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchChannels = useCallback(async () => {
    try {
      const data = await nokosRepository.getPaymentChannels();
      // data bisa berupa { data: [...] } atau langsung array
      const list = Array.isArray(data) ? data : (data?.data ?? []);
      setChannels(list);
    } catch {
      // fallback ke list statis kalau gagal
      setChannels([
        { code: 'QRIS', name: 'QRIS' },
        { code: 'BRIVA', name: 'BRI Virtual Account' },
        { code: 'BCAVA', name: 'BCA Virtual Account' },
        { code: 'BNIVA', name: 'BNI Virtual Account' },
        { code: 'MANDIRIVA', name: 'Mandiri Virtual Account' },
      ]);
    } finally {
      setLoadingChannels(false);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    setLoadingHistory(true);
    try {
      const data = await nokosRepository.getTopupHistory();
      setHistory(Array.isArray(data) ? data : []);
    } catch {
      setHistory([]);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    fetchChannels();
    fetchHistory();
  }, [fetchChannels, fetchHistory]);

  const createTopup = useCallback(async ({ amount, paymentMethod }, { onSuccess } = {}) => {
    setError('');
    setSubmitting(true);
    try {
      const data = await nokosRepository.createTopup({ amount, payment_method: paymentMethod });
      await fetchHistory();
      onSuccess?.(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, [fetchHistory]);

  return {
    channels, history,
    loadingChannels, loadingHistory,
    submitting, error,
    createTopup, fetchHistory,
  };
}
