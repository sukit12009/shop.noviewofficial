'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/shared/hooks/use-cart';
import { useCartStore } from '@/shared/store/cart-store';
import { useShippingStore } from '@/shared/store/shipping-store';
import { useOrderStore } from '@/shared/store/order-store';
import { useT } from '@/shared/hooks/use-t';
import { CartItemRow } from './CartItemRow';
import { ShippingSection } from './ShippingSection';
import { OrderSummary } from './OrderSummary';

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-10 w-10 text-white"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function OrderSuccessModal({
  orderId,
  onClose,
}: {
  orderId: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const t = useT();

  function handleViewHistory() {
    onClose();
    router.push('/profile?tab=history');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Green header */}
        <div className="flex flex-col items-center gap-3 bg-gradient-to-br from-green-400 to-emerald-500 px-8 py-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 ring-4 ring-white/40">
            <CheckIcon />
          </div>
          <h2 className="text-xl font-black text-white">{t.checkout.successTitle}</h2>
        </div>

        {/* Body */}
        <div className="flex flex-col items-center gap-4 px-8 py-7 text-center">
          <p className="text-sm leading-relaxed text-gray-500">{t.checkout.successMessage}</p>
          <div className="rounded-xl bg-gray-50 px-5 py-3">
            <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
              {t.checkout.successOrderId(orderId)}
            </p>
          </div>

          <div className="mt-2 flex w-full flex-col gap-3">
            <button
              type="button"
              onClick={handleViewHistory}
              className="w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              {t.checkout.successViewHistory}
            </button>
            <Link
              href="/"
              onClick={onClose}
              className="w-full rounded-xl border border-gray-200 py-3 text-center text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              {t.checkout.successBackHome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CheckoutPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const clearCart = useCartStore((s) => s.clearCart);
  const addOrder = useOrderStore((s) => s.addOrder);
  const router = useRouter();

  const storeAddress = useShippingStore((s) => s.address);
  const setStoreAddress = useShippingStore((s) => s.setAddress);
  const [mounted, setMounted] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shippingAddress = mounted ? storeAddress : null;

  const [discount, setDiscount] = useState(0);
  const [pointDiscount] = useState(0);
  const shippingFee = 0;
  const t = useT();

  function handleSaveAddress(addr: NonNullable<typeof shippingAddress>) {
    setStoreAddress(addr);
  }

  function handleApplyCoupon(code: string) {
    // Demo: code "NOVIEW10" gives 10% off
    if (code.toUpperCase() === 'NOVIEW10') {
      setDiscount(Math.floor(subtotal * 0.1));
    } else {
      setDiscount(0);
      alert(t.checkout.couponInvalid(code));
    }
  }

  function handleConfirm() {
    const orderId = `ORD-${Date.now()}`;
    const total = subtotal - discount - pointDiscount + shippingFee;
    addOrder({
      id: orderId,
      createdAt: new Date().toISOString(),
      items: items.map((item) => ({ ...item })),
      subtotal,
      discount: discount + pointDiscount,
      shippingFee,
      total,
      shippingAddress: shippingAddress ?? null,
      status: 'confirmed',
    });
    clearCart();
    setSuccessOrderId(orderId);
  }

  return (
    <>
    {successOrderId && (
      <OrderSuccessModal
        orderId={successOrderId}
        onClose={() => setSuccessOrderId(null)}
      />
    )}
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-gray-800">
            {t.checkout.breadcrumbHome}
          </Link>
          <span className="text-gray-300">›</span>
          <span className="font-semibold text-gray-800">{t.checkout.title}</span>
        </nav>

        {/* Page title */}
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          {t.checkout.title}
        </h1>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Left column */}
          <div className="flex-1 min-w-0">
            {/* Shipping address */}
            <ShippingSection
              address={shippingAddress}
              onSave={handleSaveAddress}
            />

            {/* Cart items */}
            {items.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
                <p className="text-gray-500">{t.checkout.emptyCart}</p>
                <Link
                  href="/"
                  className="mt-4 inline-block rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  {t.checkout.backToShop}
                </Link>
              </div>
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-white px-6">
                {/* Header row */}
                <div className="flex items-center justify-between border-b border-gray-100 py-4">
                  <span className="text-sm font-semibold text-gray-800">
                    {t.checkout.myCart}
                  </span>
                  <span className="text-sm text-gray-500">
                    {t.checkout.itemCount(items.reduce((sum, i) => sum + i.quantity, 0))}
                  </span>
                </div>

                {/* Items */}
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
            )}
          </div>

          {/* Right column — Order summary */}
          <div className="w-full lg:w-80 xl:w-96">
            <div className="sticky top-24">
              <OrderSummary
                subtotal={subtotal}
                shippingFee={shippingFee}
                discount={discount}
                pointDiscount={pointDiscount}
                hasAddress={shippingAddress !== null}
                onConfirm={handleConfirm}
                onApplyCoupon={handleApplyCoupon}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
