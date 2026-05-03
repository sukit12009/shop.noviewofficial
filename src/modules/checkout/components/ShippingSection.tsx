'use client';

import { useState } from 'react';
import { useT } from '@/shared/hooks/use-t';
import type { ShippingAddress } from '@/shared/store/shipping-store';

interface ShippingSectionProps {
  address: ShippingAddress | null;
  onSave: (address: ShippingAddress) => void;
}

function PinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

const EMPTY: ShippingAddress = {
  name: '',
  phone: '',
  address: '',
  district: '',
  province: '',
  postalCode: '',
};

export function ShippingSection({ address, onSave }: ShippingSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ShippingAddress>(address ?? EMPTY);
  const t = useT();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
    setShowForm(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="mb-4">
      {/* Section header */}
      <div className="mb-3 flex items-center gap-2 text-orange-500">
        <PinIcon />
        <span className="text-sm font-semibold">{t.shipping.sectionTitle}</span>
      </div>

      {/* Address state */}
      {!address ? (
        <div className="flex items-center justify-between rounded-xl border border-orange-200 bg-orange-50 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-orange-400">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
            </span>
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-orange-500">
                {t.shipping.addressLabel}
              </span>{' '}
              {t.shipping.noAddressMessage}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setForm(EMPTY);
              setShowForm(true);
            }}
            className="rounded-full border border-orange-400 px-4 py-1.5 text-sm font-semibold text-orange-500 transition hover:bg-orange-100"
          >
            {t.shipping.editBtn}
          </button>
        </div>
      ) : (
        <div className="flex items-start justify-between rounded-xl border border-gray-200 bg-white px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {address.name}{' '}
              <span className="font-normal text-gray-500">({address.phone})</span>
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {address.address}, {address.district}, {address.province}{' '}
              {address.postalCode}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setForm(address);
              setShowForm(true);
            }}
            className="ml-4 flex-shrink-0 rounded-full border border-gray-300 px-4 py-1.5 text-sm font-semibold text-gray-600 transition hover:border-gray-500 hover:text-gray-800"
          >
            {t.shipping.editBtn}
          </button>
        </div>
      )}

      {/* Address form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="mb-5 text-lg font-bold text-gray-900">
              {t.shipping.modalTitle}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Input label={t.shipping.fullName} name="name" value={form.name} onChange={handleChange} required />
              <Input label={t.shipping.phone} name="phone" value={form.phone} onChange={handleChange} required />
              <Input label={t.shipping.address} name="address" value={form.address} onChange={handleChange} required />
              <div className="grid grid-cols-2 gap-3">
                <Input label={t.shipping.district} name="district" value={form.district} onChange={handleChange} required />
                <Input label={t.shipping.province} name="province" value={form.province} onChange={handleChange} required />
              </div>
              <Input label={t.shipping.postalCode} name="postalCode" value={form.postalCode} onChange={handleChange} required />
              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
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
      )}
    </div>
  );
}

function Input({
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
      <label htmlFor={name} className="text-xs font-medium text-gray-500">
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
      />
    </div>
  );
}
