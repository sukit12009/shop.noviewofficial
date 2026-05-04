'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useOrderStore } from '@/shared/store/order-store';
import { useT } from '@/shared/hooks/use-t';
import type { Order, OrderStatus } from '@/core/entities/order';

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  shipped: 'bg-blue-100 text-blue-700',
  delivered: 'bg-gray-100 text-gray-600',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}


function NotFoundState({ t }: { t: ReturnType<typeof useT> }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-8 py-20 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <svg
          className="h-10 w-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
          />
        </svg>
      </div>
      <h2 className="mb-2 text-xl font-bold text-gray-900">
        {t.orderSuccess.notFound}
      </h2>
      <p className="mb-8 max-w-xs text-sm text-gray-500">
        {t.orderSuccess.notFoundMessage}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/profile?tab=history"
          className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          {t.orderSuccess.viewHistory}
        </Link>
        <Link
          href="/"
          className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
        >
          {t.orderSuccess.continueShopping}
        </Link>
      </div>
    </div>
  );
}

function OrderCard({ order, t }: { order: Order; t: ReturnType<typeof useT> }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Order header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50 px-6 py-4">
        <div>
          <p className="text-xs text-gray-400">{t.orderSuccess.orderId(order.id)}</p>
          <p className="mt-0.5 text-xs text-gray-500">
            {t.orderSuccess.orderDate}: {formatDate(order.createdAt)}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLOR[order.status]}`}
        >
          {t.orderSuccess.status[order.status]}
        </span>
      </div>

      {/* Items */}
      <div className="divide-y divide-gray-50 px-6">
        <p className="py-4 text-sm font-semibold text-gray-800">{t.orderSuccess.items}</p>
        {order.items.map((item) => (
          <div key={item.variantKey} className="flex items-center gap-4 py-4">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={item.imageUrl || '/placeholder.png'}
                alt={item.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-gray-800">{item.name}</p>
              {(item.color || item.size) && (
                <p className="mt-0.5 text-xs text-gray-400">
                  {[item.color, item.size].filter(Boolean).join(' / ')}
                </p>
              )}
              <p className="mt-0.5 text-xs text-gray-400">×{item.quantity}</p>
            </div>
            <p className="flex-shrink-0 text-sm font-semibold text-gray-800">
              ฿{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Pricing breakdown */}
      <div className="border-t border-gray-100 bg-gray-50 px-6 py-5">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">{t.orderSuccess.subtotal}</span>
            <span className="font-semibold text-gray-800">
              ฿{order.subtotal.toLocaleString()}
            </span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t.orderSuccess.discount}</span>
              <span className="font-semibold text-green-600">
                -฿{order.discount.toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">{t.orderSuccess.shippingFee}</span>
            <span className="font-semibold text-gray-800">
              {order.shippingFee === 0 ? '฿0' : `฿${order.shippingFee.toLocaleString()}`}
            </span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-3">
            <span className="font-bold text-gray-900">{t.orderSuccess.total}</span>
            <span className="text-lg font-black text-orange-500">
              ฿{order.total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping address */}
      {order.shippingAddress && (
        <div className="border-t border-gray-100 px-6 py-5">
          <p className="mb-2 text-sm font-semibold text-gray-800">
            {t.orderSuccess.shippingAddress}
          </p>
          <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600 leading-relaxed">
            <p className="font-semibold text-gray-800">{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.phone}</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.district} {order.shippingAddress.province}{' '}
              {order.shippingAddress.postalCode}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

interface OrderSuccessPageProps {
  orderId: string;
}

export function OrderSuccessPage({ orderId }: OrderSuccessPageProps) {
  const [mounted, setMounted] = useState(false);
  const orders = useOrderStore((s) => s.orders);
  const t = useT();

  useEffect(() => {
    setMounted(true);
  }, []);

  const order = mounted ? orders.find((o) => o.id === orderId) : undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-gray-800">
            {t.orderSuccess.breadcrumbHome}
          </Link>
          <span className="text-gray-300">›</span>
          <Link
            href="/profile?tab=history"
            className="transition hover:text-gray-800"
          >
            {t.orderSuccess.breadcrumbOrders}
          </Link>
          <span className="text-gray-300">›</span>
          <span className="font-semibold text-gray-800 truncate max-w-[140px]">
            {orderId}
          </span>
        </nav>

        {!mounted ? null : !order ? (
          <NotFoundState t={t} />
        ) : (
          <OrderCard order={order} t={t} />
        )}
      </div>
    </div>
  );
}
