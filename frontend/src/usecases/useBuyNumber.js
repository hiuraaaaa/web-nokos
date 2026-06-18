import { useCallback, useEffect, useRef, useState } from 'react';
import { nokosRepository } from '../infrastructure/http/nokosRepository';
import { ACTIVE_STATUSES } from '../domain/entities/order';

const POLL_INTERVAL_MS = 5000;

export function useBuyNumber() {
  const [activeOrder, setActiveOrder] = useState(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);
  const pollRef = useRef(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = null;
  }, []);

  const pollOrder = useCallback(
    (orderId) => {
      stopPolling();
      pollRef.current = setInterval(async () => {
        try {
          const updated = await nokosRepository.checkOrder(orderId);
          setActiveOrder(updated);
          if (!ACTIVE_STATUSES.includes(updated.status)) stopPolling();
        } catch {
          // Diamkan error sesaat di polling, biar gak nge-flash error tiap 5 detik.
        }
      }, POLL_INTERVAL_MS);
    },
    [stopPolling]
  );

  const buyNumber = useCallback(
    async ({ numberId, providerId, operatorId }) => {
      setCreating(true);
      setError(null);
      try {
        const order = await nokosRepository.createOrder({
          number_id: numberId,
          provider_id: providerId,
          operator_id: operatorId,
        });
        setActiveOrder(order);
        pollOrder(order.orderId);
        return order;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setCreating(false);
      }
    },
    [pollOrder]
  );

  const changeStatus = useCallback(
    async (orderId, status) => {
      const updated = await nokosRepository.setOrderStatus(orderId, status);
      setActiveOrder(updated);
      if (status === 'resend') {
        pollOrder(orderId);
      } else if (!ACTIVE_STATUSES.includes(updated.status)) {
        stopPolling();
      }
      return updated;
    },
    [pollOrder, stopPolling]
  );

  useEffect(() => stopPolling, [stopPolling]);

  return {
    activeOrder,
    creating,
    error,
    buyNumber,
    changeStatus,
    clearActiveOrder: () => {
      stopPolling();
      setActiveOrder(null);
    },
  };
}
