'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/shared/hooks/use-cart';
import { useShippingStore } from '@/shared/store/shipping-store';
import { useT } from '@/shared/hooks/use-t';
import { CartItemRow } from './CartItemRow';
import { ShippingSection } from './ShippingSection';
import { OrderSummary } from './OrderSummary';

export function CheckoutPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  const storeAddress = useShippingStore((s) => s.address);
  const setStoreAddress = useShippingStore((s) => s.setAddress);
  const [mounted, setMounted] = useState(false);

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
    alert(t.checkout.confirmAlert);
  }

  return (
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
  );
}
