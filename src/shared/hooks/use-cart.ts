'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '../store/cart-store';

interface UseCartResult {
  itemCount: number;
}

/**
 * Wraps the Zustand cart store with a mounted guard to prevent
 * SSR / client hydration mismatches from the persist middleware.
 */
export function useCart(): UseCartResult {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted
    ? items.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  return { itemCount };
}
