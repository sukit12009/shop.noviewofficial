import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

/**
 * Cart store — actions will be implemented in a separate task.
 * Persisted to localStorage under 'cart-storage'.
 */
export const useCartStore = create<CartState>()(
  devtools(
    persist(
      () => ({
        items: [] as CartItem[],
      }),
      { name: 'cart-storage' },
    ),
    { name: 'CartStore' },
  ),
);
