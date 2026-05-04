'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/shared/hooks/use-cart';
import { useT } from '@/shared/hooks/use-t';
import { CartItemRow } from '@/modules/checkout/components/CartItemRow';

function EmptyCartState({ t }: { t: ReturnType<typeof useT> }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-8 py-20 text-center">
      {/* Cart icon */}
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
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </div>
      <h2 className="mb-2 text-xl font-bold text-gray-900">{t.cart.empty}</h2>
      <p className="mb-8 max-w-xs text-sm text-gray-500">{t.cart.emptyMessage}</p>
      <Link
        href="/"
        className="rounded-xl bg-orange-500 px-8 py-3 text-sm font-bold tracking-wide text-white transition hover:bg-orange-600"
      >
        {t.cart.backToShop}
      </Link>
    </div>
  );
}

export function CartPage() {
  const { items, subtotal, itemCount, updateQuantity, removeItem } = useCart();
  const [mounted, setMounted] = useState(false);
  const t = useT();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? items.reduce((sum, i) => sum + i.quantity, 0) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-gray-800">
            {t.cart.breadcrumbHome}
          </Link>
          <span className="text-gray-300">›</span>
          <span className="font-semibold text-gray-800">{t.cart.title}</span>
        </nav>

        {/* Title */}
        <div className="mb-8 flex items-baseline gap-3">
          <h1 className="text-3xl font-bold text-gray-900">{t.cart.title}</h1>
          {mounted && totalItems > 0 && (
            <span className="text-base text-gray-500">
              {t.cart.itemCount(totalItems)}
            </span>
          )}
        </div>

        {!mounted || items.length === 0 ? (
          /* Empty state */
          <EmptyCartState t={t} />
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* Left — cart items */}
            <div className="min-w-0 flex-1">
              <div className="rounded-2xl border border-gray-200 bg-white px-6">
                {/* Column headers — visible on md+ */}
                <div className="hidden border-b border-gray-100 py-4 md:flex md:items-center">
                  <span className="flex-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {t.cartItem.productLabel}
                  </span>
                  <span className="w-28 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {t.cartItem.price}
                  </span>
                  <span className="w-32 pl-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {t.cartItem.quantity}
                  </span>
                  <span className="w-28 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {t.cartItem.total}
                  </span>
                </div>

                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <CartItemRow
                      key={item.variantKey}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              </div>

              {/* Continue shopping link */}
              <div className="mt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-gray-800"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  {t.cart.continueShopping}
                </Link>
              </div>
            </div>

            {/* Right — order summary */}
            <div className="w-full lg:w-80 xl:w-96">
              <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-base font-bold text-gray-900">
                  {t.orderSummary.title}
                </h2>

                {/* Item list summary */}
                <div className="mb-4 space-y-2.5">
                  {items.map((item) => (
                    <div key={item.variantKey} className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-gray-700">{item.name}</p>
                        {(item.color || item.size) && (
                          <p className="text-xs text-gray-400">
                            {[item.color, item.size].filter(Boolean).join(' / ')}
                          </p>
                        )}
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-xs text-gray-400">×{item.quantity}</p>
                        <p className="text-sm font-semibold text-gray-800">
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{t.cart.subtotal}</span>
                    <span className="text-sm font-semibold text-gray-800">
                      ฿{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-400">
                    {t.productDetail.noteNoShipping}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => router.push('/checkout')}
                  className="mt-5 w-full rounded-xl bg-orange-500 py-4 text-sm font-bold tracking-wide text-white transition hover:bg-orange-600"
                >
                  {t.cart.proceedToCheckout}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
