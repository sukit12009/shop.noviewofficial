'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/shared/store/cart-store';
import type { ProductViewModel } from '../presenters/product-presenter';

interface ProductCardProps {
  product: ProductViewModel;
}

export function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-52 bg-gray-50">
        <Image
          src={product.imageUrl || '/placeholder.png'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-semibold text-white">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">
          {product.category}
        </p>
        <h3 className="truncate font-semibold text-gray-800">{product.name}</h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-gray-500">
          {product.description}
        </p>
        <p className="mt-3 text-base font-bold text-indigo-600">
          {product.formattedPrice}
        </p>
        <button
          type="button"
          onClick={handleAddToCart}
          className={`mt-3 w-full rounded-lg py-2 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            added
              ? 'bg-green-500 focus:ring-green-500'
              : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
          }`}
        >
          {added ? '✓ เพิ่มในตะกร้าแล้ว' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
