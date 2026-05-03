'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/shared/store/auth-store';
import { useShippingStore } from '@/shared/store/shipping-store';
import { useOrderStore } from '@/shared/store/order-store';
import { useT } from '@/shared/hooks/use-t';
import { useWishlistItems } from '@/shared/hooks/use-wishlist-items';
import { CategoryProductCard } from '@/modules/category/components/CategoryProductCard';
import type { ShippingAddress } from '@/shared/store/shipping-store';
import type { Order } from '@/core/entities/order';

type Tab = 'information' | 'wishlist' | 'history';

const EMPTY_ADDRESS: ShippingAddress = {
  name: '',
  phone: '',
  address: '',
  district: '',
  province: '',
  postalCode: '',
};

function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function AddressModal({
  initial,
  onSave,
  onClose,
}: {
  initial: ShippingAddress;
  onSave: (addr: ShippingAddress) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ShippingAddress>(initial);
  const t = useT();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="mb-5 text-lg font-bold text-gray-900">
          {t.shipping.modalTitle}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Field label={t.shipping.fullName} name="name" value={form.name} onChange={handleChange} required />
          <Field label={t.shipping.phone} name="phone" value={form.phone} onChange={handleChange} required />
          <Field label={t.shipping.address} name="address" value={form.address} onChange={handleChange} required />
          <div className="grid grid-cols-2 gap-3">
            <Field label={t.shipping.district} name="district" value={form.district} onChange={handleChange} required />
            <Field label={t.shipping.province} name="province" value={form.province} onChange={handleChange} required />
          </div>
          <Field label={t.shipping.postalCode} name="postalCode" value={form.postalCode} onChange={handleChange} required />
          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-300 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              {t.shipping.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              {t.shipping.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={`profile-${name}`} className="text-xs font-medium text-gray-500">
        {label}
      </label>
      <input
        id={`profile-${name}`}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
      />
    </div>
  );
}

const STATUS_COLOR: Record<Order['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
};

function formatPrice(n: number) {
  return n.toLocaleString('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function ProfilePage() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as Tab | null) ?? 'information';
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const shippingAddress = useShippingStore((s) => s.address);
  const setShippingAddress = useShippingStore((s) => s.setAddress);
  const orders = useOrderStore((s) => s.orders);
  const { items: wishlistItems, isLoading: wishlistLoading } = useWishlistItems();
  const t = useT();

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <p className="text-gray-500">{t.profile.loginRequired}</p>
        <Link
          href="/login"
          className="rounded-xl bg-orange-500 px-8 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
        >
          {t.profile.loginBtn}
        </Link>
      </div>
    );
  }

  const TABS: { key: Tab; label: string }[] = [
    { key: 'information', label: t.profile.tabInformation },
    { key: 'wishlist', label: t.profile.tabWishlist(wishlistItems.length) },
    { key: 'history', label: t.profile.tabHistory },
  ];

  const addressDisplay = shippingAddress
    ? `${shippingAddress.address}, ${shippingAddress.district}, ${shippingAddress.province} ${shippingAddress.postalCode}`
    : '';

  const infoRows = [
    { label: t.profile.ketchupId, value: user.id },
    { label: t.profile.fullName, value: user.name },
    { label: t.profile.phone, value: user.phone ?? '' },
    { label: t.profile.email, value: user.email },
    { label: t.profile.address, value: addressDisplay },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-gray-800">
            {t.profile.breadcrumbHome}
          </Link>
          <span className="text-gray-300">›</span>
          <span className="font-semibold text-gray-800">{t.profile.title}</span>
        </nav>

        {/* Page title */}
        <h1 className="mb-10 text-center text-3xl font-black tracking-[0.2em] text-gray-900 uppercase">
          {t.profile.title}
        </h1>

        {/* Avatar + name + points */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-100 ring-4 ring-orange-100">
            {user.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={user.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <span className="text-2xl font-bold text-gray-400">
                {user.name[0]?.toUpperCase()}
              </span>
            )}
          </div>
          <p className="text-lg font-semibold text-gray-900">{user.name}</p>
          <p className="text-sm font-semibold text-orange-500">
            {t.profile.points(user.points ?? 0)}
          </p>
        </div>

        {/* Profile card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          {/* Orange top accent bar */}
          <div className="h-1 w-full bg-orange-500" />

          {/* Tab bar + action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-white px-6 py-4">
            <div className="flex items-center gap-6">
              {TABS.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`pb-1 text-sm font-semibold transition-colors ${
                    activeTab === key
                      ? 'border-b-2 border-gray-800 text-gray-900'
                      : 'text-orange-500 hover:text-orange-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowAddressModal(true)}
                className="flex items-center gap-1.5 rounded-md bg-orange-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-orange-600"
              >
                {t.profile.editDeliveryAddress}
                <EditIcon />
              </button>
              <button
                type="button"
                onClick={logout}
                className="rounded-md border border-gray-300 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-gray-600 transition hover:border-gray-500 hover:text-gray-900"
              >
                {t.profile.logout}
              </button>
            </div>
          </div>

          {/* Tab content */}
          <div className="bg-orange-50/50 px-8 py-2">
            {activeTab === 'information' && (
              <div className="divide-y divide-orange-100">
                {infoRows.map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-4 py-4">
                    <span className="w-36 flex-shrink-0 text-sm text-gray-400">
                      {label}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {value || t.profile.notProvided}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="py-6">
                {wishlistLoading ? (
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="space-y-3">
                        <div className="aspect-square animate-pulse rounded-xl bg-gray-200" />
                        <div className="h-3 w-3/4 animate-pulse rounded-full bg-gray-200" />
                        <div className="h-3 w-1/2 animate-pulse rounded-full bg-gray-200" />
                      </div>
                    ))}
                  </div>
                ) : wishlistItems.length === 0 ? (
                  <div className="flex min-h-[200px] items-center justify-center">
                    <p className="text-sm text-gray-400">{t.profile.emptyWishlist}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                    {wishlistItems.map((item) => (
                      <CategoryProductCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="py-6">
                {!mounted || orders.length === 0 ? (
                  <div className="flex min-h-[200px] items-center justify-center">
                    <p className="text-sm text-gray-400">{t.profile.emptyHistory}</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                      >
                        {/* Order header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-5 py-3">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-800">
                              {t.orderHistory.orderId(order.id)}
                            </span>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLOR[order.status]}`}
                            >
                              {t.orderHistory.status[order.status]}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span>{t.orderHistory.date}: {formatDate(order.createdAt)}</span>
                            <span>{t.orderHistory.itemCount(order.items.reduce((s, i) => s + i.quantity, 0))}</span>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="divide-y divide-gray-50 px-5">
                          {order.items.map((item) => (
                            <div key={item.variantKey} className="flex items-center gap-4 py-3">
                              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                <Image
                                  src={item.imageUrl}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                  sizes="56px"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-gray-800">{item.name}</p>
                                <p className="text-xs text-gray-400">
                                  {[item.color, item.size].filter(Boolean).join(' / ')}
                                  {' '}× {item.quantity}
                                </p>
                              </div>
                              <p className="flex-shrink-0 text-sm font-bold text-gray-800">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-5 py-3">
                          <span className="text-sm text-gray-500">{t.orderHistory.total}:</span>
                          <span className="text-base font-black text-orange-500">
                            {formatPrice(order.total)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Address modal */}
      {showAddressModal && (
        <AddressModal
          initial={shippingAddress ?? EMPTY_ADDRESS}
          onSave={(addr) => {
            setShippingAddress(addr);
            setShowAddressModal(false);
          }}
          onClose={() => setShowAddressModal(false)}
        />
      )}
    </div>
  );
}
