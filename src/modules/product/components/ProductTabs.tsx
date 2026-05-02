'use client';

import { useState } from 'react';
import type { ProductDetailViewModel } from '../presenters/product-presenter';

interface ProductTabsProps {
  product: ProductDetailViewModel;
}

const TABS = [
  { key: 'details', label: 'รายละเอียด' },
  { key: 'size', label: 'ตารางขนาด' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('details');

  const showSizeTab = product.sizeChart.length > 0;

  return (
    <div className="mt-12">
      {/* Tab bar */}
      <div className="border-b border-gray-200">
        <div className="flex gap-0">
          {TABS.filter((t) => t.key !== 'size' || showSizeTab).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-6 py-3 text-sm font-semibold transition ${
                activeTab === tab.key
                  ? 'text-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-orange-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="rounded-b-xl bg-orange-50/60 px-6 py-8 md:px-10">
        {activeTab === 'details' && (
          <div className="max-w-xl">
            {product.details.split('\n').map((line, i) => {
              if (!line.trim()) return <br key={i} />;
              const isBold = /^\d+\./.test(line.trim()) || /^[A-Z]/.test(line.trim());
              return (
                <p
                  key={i}
                  className={`leading-relaxed ${
                    isBold ? 'font-semibold text-gray-800' : 'text-gray-600'
                  }`}
                >
                  {line}
                </p>
              );
            })}
          </div>
        )}

        {activeTab === 'size' && (
          <div className="max-w-xl">
            {product.sizeChart.split('\n').map((line, i) => {
              if (!line.trim()) return <br key={i} />;
              return (
                <p key={i} className="leading-relaxed text-gray-600">
                  {line}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
