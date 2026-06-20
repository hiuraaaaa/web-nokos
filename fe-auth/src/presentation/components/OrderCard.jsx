import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { formatCountdown, isActive, secondsUntilExpiry } from '../../domain/entities/order';

export function OrderCard({ order, onChangeStatus, onDismiss }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  if (!order) return null;

  const waiting = order.status === 'pending';
  const active = isActive(order);
  const seconds = secondsUntilExpiry(order);

  return (
    <div className="card max-w-2xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted">
            {order.service} &middot; {order.country}
          </p>
          <p className="mt-1 font-mono text-2xl font-semibold tracking-tight text-ink">
            {order.phoneNumber}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-md border border-line bg-surface-alt px-4 py-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center">
          {waiting ? (
            <Loader2 size={18} className="animate-spin text-muted" />
          ) : (
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                order.otpCode ? 'bg-signal-emerald' : 'bg-muted-2'
              }`}
            />
          )}
        </div>

        {order.otpCode ? (
          <div>
            <p className="text-xs text-muted">Kode OTP</p>
            <p className="font-mono text-xl font-bold tracking-widest text-signal-emerald">
              {order.otpCode}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-ink">Menunggu SMS masuk&hellip;</p>
            <p className="text-xs text-muted">Sisa waktu {formatCountdown(seconds)}</p>
          </div>
        )}
      </div>

      {order.otpMessage && (
        <p className="mt-3 whitespace-pre-line rounded-md border border-line bg-surface-alt px-3 py-2 text-xs text-muted">
          {order.otpMessage}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {active && (
          <>
            <button
              onClick={() => onChangeStatus(order.orderId, 'resend')}
              className="btn-secondary"
            >
              Kirim ulang
            </button>
            <button
              onClick={() => onChangeStatus(order.orderId, 'cancel')}
              className="btn-danger"
            >
              Batalkan
            </button>
          </>
        )}
        {order.otpCode && order.status !== 'completed' && (
          <button
            onClick={() => onChangeStatus(order.orderId, 'done')}
            className="btn-primary"
          >
            Selesai
          </button>
        )}
        {!active && (
          <button onClick={onDismiss} className="btn-secondary ml-auto">
            Tutup
          </button>
        )}
      </div>
    </div>
  );
}
