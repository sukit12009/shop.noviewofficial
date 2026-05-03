'use client';

import { useState } from 'react';
import { useCartStore as useCart } from '../../../shared/store/cart-store';
import { useWishlist } from '../../../shared/hooks/use-wishlist';
import { useT } from '../../../shared/hooks/use-t';
import type { ProductDetailViewModel } from '../presenters/product-presenter';

interface ProductInfoProps {
  product: ProductDetailViewModel;
}

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors[0]?.label ?? null,
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes[0] ?? null,
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addItem = useCart((s) => s.addItem);
  const { has, toggle } = useWishlist();
  const t = useT();

  const isFav = has(product.id);

  function handleAddToCart() {
    if (product.colors.length > 0 && !selectedColor) {
      setError(t.productDetail.pleaseSelectColor);
      return;
    }
    if (product.sizes.length > 0 && !selectedSize) {
      setError(t.productDetail.pleaseSelectSize);
      return;
    }
    setError(null);
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
      color: selectedColor ?? undefined,
      size: selectedSize ?? undefined,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Wishlist */}
      <button
        type="button"
        onClick={() => toggle(product.id)}
        className={`flex items-center gap-1.5 self-start text-sm transition ${
          isFav ? 'text-rose-500' : 'text-gray-400 hover:text-rose-400'
        }`}
      >
        <HeartIcon filled={isFav} />
        <span>{isFav ? t.wishlist.remove : t.productDetail.addToWishlist}</span>
      </button>

      {/* Name */}
      <div>
        <h1 className="text-2xl font-bold leading-snug text-gray-900 md:text-3xl">
          {product.name}
        </h1>
        <p className="mt-2 text-2xl font-bold text-gray-900">
          {product.formattedPrice}
        </p>
      </div>

      {/* Color selector */}
      {product.colors.length > 0 && (
        <div className="flex items-center gap-4">
          <span className="w-14 flex-shrink-0 text-sm font-medium text-gray-600">{t.productDetail.color}</span>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color.label}
                type="button"
                onClick={() => { setSelectedColor(color.label); setError(null); }}
                className={`rounded-md border px-4 py-1.5 text-sm transition ${
                  selectedColor === color.label
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-300 text-gray-700 hover:border-gray-600'
                }`}
              >
                {color.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size selector */}
      {product.sizes.length > 0 && (
        <div className="flex items-center gap-4">
          <span className="w-14 flex-shrink-0 text-sm font-medium text-gray-600">{t.productDetail.size}</span>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => { setSelectedSize(size); setError(null); }}
                className={`rounded-md border px-4 py-1.5 text-sm transition ${
                  selectedSize === size
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-300 text-gray-700 hover:border-gray-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="flex items-center gap-4">
          <span className="w-14 flex-shrink-0 text-sm font-medium text-gray-600">{t.productDetail.quantity}</span>
        <div className="flex items-center gap-0 rounded-md border border-gray-300">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:opacity-40"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-semibold text-gray-800">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            disabled={quantity >= product.stock}
            className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm font-medium text-red-500">{error}</p>
      )}

      {/* Add to cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={product.isSoldOut || addedToCart}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-bold tracking-wide transition ${
          product.isSoldOut
            ? 'cursor-not-allowed bg-gray-300 text-gray-500'
            : addedToCart
            ? 'bg-green-500 text-white'
            : 'bg-orange-500 text-white hover:bg-orange-600'
        }`}
      >
        {product.isSoldOut ? (
          t.productDetail.soldOut
        ) : addedToCart ? (
          <>
            <CheckIcon />
            {t.productDetail.addedToCartSuccess}
          </>
        ) : (
          <>
            <CartIcon />
            {t.productDetail.addToCartBtn}
          </>
        )}
      </button>

      {/* Notes */}
      <div className="space-y-1 text-xs text-gray-500">
        <p>{t.productDetail.noteNoShipping}</p>
        <p>{t.productDetail.noteInternational}</p>
      </div>
    </div>
  );
}
