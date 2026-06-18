import { useEffect, useState } from 'react';
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
    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted">
            {order.service} &middot; {order.country}
          </p>
          <p className="mt-1 font-mono text-2xl font-semibold tracking-tight">
            {order.phoneNumber}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl border border-line bg-base px-4 py-3">
        <div className="relative flex h-8 w-8 items-center justify-center">
          {waiting && (
            <span className="absolute h-3 w-3 rounded-full bg-signal-amber animate-signal-pulse" />
          )}
          <span
            className={`relative h-3 w-3 rounded-full ${
              waiting ? 'bg-signal-amber' : order.otpCode ? 'bg-signal-emerald' : 'bg-muted'
            }`}
          />
        </div>

        {order.otpCode ? (
          <div className="animate-otp-land">
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
        <p className="mt-3 whitespace-pre-line rounded-lg bg-base px-3 py-2 text-xs text-muted">
          {order.otpMessage}
        </p>
      )}

      <div className="mt-4 flex gap-2">
        {active && (
          <>
            <button
              onClick={() => onChangeStatus(order.orderId, 'resend')}
              className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted hover:text-ink"
            >
              Kirim ulang
            </button>
            <button
              onClick={() => onChangeStatus(order.orderId, 'cancel')}
              className="rounded-lg border border-signal-rose/40 px-3 py-1.5 text-sm text-signal-rose hover:bg-signal-rose/10"
            >
              Batalkan
            </button>
          </>
        )}
        {order.otpCode && order.status !== 'completed' && (
          <button
            onClick={() => onChangeStatus(order.orderId, 'done')}
            className="rounded-lg bg-signal-emerald px-3 py-1.5 text-sm font-medium text-base"
          >
            Selesai
          </button>
        )}
        {!active && (
          <button
            onClick={onDismiss}
            className="ml-auto rounded-lg px-3 py-1.5 text-sm text-muted hover:text-ink"
          >
            Tutup
          </button>
        )}
      </div>
    </div>
  );
}
