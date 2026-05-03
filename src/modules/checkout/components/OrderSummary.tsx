'use client';

import { useState } from 'react';

interface OrderSummaryProps {
  subtotal: number;
  shippingFee: number;
  discount: number;
  pointDiscount: number;
  hasAddress: boolean;
  onConfirm: () => void;
  onApplyCoupon: (code: string) => void;
}

function VisaIcon() {
  return (
    <svg viewBox="0 0 38 24" width="38" height="24" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="4" fill="#1A1F71" />
      <text x="5" y="17" fontSize="11" fontWeight="bold" fill="white" fontFamily="Arial">VISA</text>
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg viewBox="0 0 38 24" width="38" height="24" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="4" fill="#252525" />
      <circle cx="14" cy="12" r="7" fill="#EB001B" />
      <circle cx="24" cy="12" r="7" fill="#F79E1B" />
      <path d="M19 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 19 6.8z" fill="#FF5F00" />
    </svg>
  );
}

function JcbIcon() {
  return (
    <svg viewBox="0 0 38 24" width="38" height="24" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="4" fill="white" stroke="#e2e8f0" />
      <rect x="4" y="4" width="10" height="16" rx="3" fill="#003087" />
      <rect x="14" y="4" width="10" height="16" rx="3" fill="#CC0000" />
      <rect x="24" y="4" width="10" height="16" rx="3" fill="#007B40" />
    </svg>
  );
}

function AmexIcon() {
  return (
    <svg viewBox="0 0 38 24" width="38" height="24" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="4" fill="#2E77BC" />
      <text x="4" y="16" fontSize="8" fontWeight="bold" fill="white" fontFamily="Arial">AMEX</text>
    </svg>
  );
}

function KBankIcon() {
  return (
    <svg viewBox="0 0 38 24" width="38" height="24" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="4" fill="#138F2D" />
      <text x="4" y="16" fontSize="8" fontWeight="bold" fill="white" fontFamily="Arial">KBank</text>
    </svg>
  );
}

function ScbIcon() {
  return (
    <svg viewBox="0 0 38 24" width="38" height="24" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="4" fill="#4E2D8B" />
      <text x="6" y="16" fontSize="9" fontWeight="bold" fill="white" fontFamily="Arial">SCB</text>
    </svg>
  );
}

export function OrderSummary({
  subtotal,
  shippingFee,
  discount,
  pointDiscount,
  hasAddress,
  onConfirm,
  onApplyCoupon,
}: OrderSummaryProps) {
  const [couponCode, setCouponCode] = useState('');
  const total = subtotal + shippingFee - discount - pointDiscount;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-base font-bold text-gray-900">
        สินค้าในตะกร้าของฉัน
      </h2>

      {/* Subtotal */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">ราคารวม</span>
        <span className="font-semibold text-gray-800">
          ฿{subtotal.toLocaleString()}
        </span>
      </div>

      {/* Shipping */}
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-gray-500">ค่าส่ง</span>
        <span className="font-semibold text-gray-800">
          {shippingFee === 0 ? '฿0' : `฿${shippingFee.toLocaleString()}`}
        </span>
      </div>

      {/* Coupon */}
      <div className="mt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="บัตรของขวัญหรือรหัสส่วนลด"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
          <button
            type="button"
            onClick={() => {
              if (couponCode.trim()) {
                onApplyCoupon(couponCode.trim());
                setCouponCode('');
              }
            }}
            className="flex-shrink-0 rounded-lg bg-gray-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-900"
          >
            ใช้ส่วนลด
          </button>
        </div>
      </div>

      {/* Discounts */}
      <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">ส่วนลด</span>
          <span className="font-semibold text-gray-800">
            ฿{discount.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">ส่วนลดจากคะแนน</span>
          <span className="font-semibold text-gray-800">
            ฿{pointDiscount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="font-bold text-gray-900">ราคารวม</span>
        <span className="text-lg font-bold text-gray-900">
          ฿{total.toLocaleString()}
        </span>
      </div>

      {/* Confirm button */}
      <button
        type="button"
        onClick={onConfirm}
        disabled={!hasAddress}
        className={`mt-5 w-full rounded-xl py-4 text-sm font-bold tracking-wide transition ${
          hasAddress
            ? 'bg-orange-500 text-white hover:bg-orange-600'
            : 'cursor-not-allowed bg-gray-200 text-gray-400'
        }`}
      >
        ยืนยันการสั่งซื้อ →
      </button>

      {/* Payment icons */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
        <VisaIcon />
        <MastercardIcon />
        <JcbIcon />
        <AmexIcon />
        <KBankIcon />
        <ScbIcon />
      </div>
    </div>
  );
}
