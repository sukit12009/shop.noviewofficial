'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '../store/cart-store';
import type { CartItem } from '../store/cart-store';

interface UseCartResult {
  itemCount: number;
  items: CartItem[];
  subtotal: number;
  updateQuantity: (variantKey: string, quantity: number) => void;
  removeItem: (variantKey: string) => void;
  clearCart: () => void;
}

/**
 * Wraps the Zustand cart store with a mounted guard to prevent
 * SSR / client hydration mismatches from the persist middleware.
 */
export function useCart(): UseCartResult {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hydratedItems = mounted ? items : [];
  const itemCount = hydratedItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = hydratedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return { itemCount, items: hydratedItems, subtotal, updateQuantity, removeItem, clearCart };
}
