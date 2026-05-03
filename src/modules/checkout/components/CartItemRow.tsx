'use client';

import Image from 'next/image';
import { useT } from '@/shared/hooks/use-t';
import type { CartItem } from '@/shared/store/cart-store';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  const totalPrice = item.price * item.quantity;
  const t = useT();

  return (
    <div className="flex items-start gap-4 py-5">
      {/* Product image */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={item.imageUrl || '/placeholder.png'}
          alt={item.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      {/* Product details */}
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex-1">
          <p className="text-xs text-gray-400">{t.cartItem.productLabel}</p>
          <p className="mt-0.5 text-sm font-semibold leading-snug text-gray-800">
            {item.name}
          </p>
        </div>

        {/* Price */}
        <div className="text-left sm:w-28 sm:text-right">
          <p className="text-xs text-gray-400">{t.cartItem.price}</p>
          <p className="mt-0.5 text-sm font-semibold text-gray-800">
            ฿{item.price.toLocaleString()}
          </p>
        </div>

        {/* Quantity */}
        <div className="sm:w-32">
          <p className="text-xs text-gray-400">{t.cartItem.quantity}</p>
          <div className="mt-0.5 flex items-center gap-0 rounded-md border border-gray-300 w-fit">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
              className="flex h-8 w-8 items-center justify-center text-gray-500 transition hover:bg-gray-100"
              aria-label={t.cartItem.decreaseAriaLabel}
            >
              −
            </button>
            <span className="w-9 text-center text-sm font-semibold text-gray-800">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center text-gray-500 transition hover:bg-gray-100"
              aria-label={t.cartItem.increaseAriaLabel}
            >
              +
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between sm:block sm:w-28 sm:text-right">
          <div>
            <p className="text-xs text-gray-400">{t.cartItem.total}</p>
            <p className="mt-0.5 text-sm font-semibold text-gray-800">
              ฿{totalPrice.toLocaleString()}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.productId)}
            className="text-xs text-gray-400 underline transition hover:text-red-500 sm:mt-1 sm:block"
          >
            {t.cartItem.remove}
          </button>
        </div>
      </div>
    </div>
  );
}
