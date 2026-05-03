'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/shared/store/cart-store';
import { useWishlist } from '@/shared/hooks/use-wishlist';
import { useT } from '@/shared/hooks/use-t';
import type { CategoryItem } from '../hooks/useCategoryItems';

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17" height="17" viewBox="0 0 24 24"
      fill={filled ? '#f97316' : 'none'}
      stroke={filled ? '#f97316' : 'currentColor'}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

interface CategoryProductCardProps {
  item: CategoryItem;
}

export function CategoryProductCard({ item }: CategoryProductCardProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { has, toggle } = useWishlist();
  const t = useT();

  const isFav = has(item.id);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ productId: item.id, name: item.name, price: item.price, imageUrl: item.imageUrl });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="group relative flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={item.imageUrl || '/placeholder.png'}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        />

        {item.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-black px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-white">
            {item.badge}
          </span>
        )}

        {/* Wishlist button */}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); toggle(item.id); }}
          aria-label={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition hover:bg-white ${
            isFav ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          <HeartIcon filled={isFav} />
        </button>

        {/* Add to cart (slides up on hover) */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button
            type="button"
            onClick={handleAdd}
            className={`w-full py-2.5 text-xs font-bold tracking-wide text-white transition-colors ${
              added ? 'bg-green-500' : 'bg-black hover:bg-gray-800'
            }`}
          >
            {added ? t.category.added : `+ ${t.category.addToCart}`}
          </button>
        </div>
      </div>

      <div className="mt-2.5 space-y-0.5 px-0.5">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 group-hover:text-orange-500">
          {item.name}
        </h3>
        <p className="text-sm font-bold text-orange-500">{item.formattedPrice}</p>
      </div>
    </div>
  );
}
