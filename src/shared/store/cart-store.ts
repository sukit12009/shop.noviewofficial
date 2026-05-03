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
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        items: [],

        addItem: (newItem) =>
          set((state) => {
            const existing = state.items.find(
              (i) => i.productId === newItem.productId,
            );
            if (existing) {
              return {
                items: state.items.map((i) =>
                  i.productId === newItem.productId
                    ? { ...i, quantity: i.quantity + (newItem.quantity ?? 1) }
                    : i,
                ),
              };
            }
            return {
              items: [
                ...state.items,
                { ...newItem, quantity: newItem.quantity ?? 1 },
              ],
            };
          }),

        removeItem: (productId) =>
          set((state) => ({
            items: state.items.filter((i) => i.productId !== productId),
          })),

        updateQuantity: (productId, quantity) =>
          set((state) => ({
            items:
              quantity <= 0
                ? state.items.filter((i) => i.productId !== productId)
                : state.items.map((i) =>
                    i.productId === productId ? { ...i, quantity } : i,
                  ),
          })),

        clearCart: () => set({ items: [] }),
      }),
      { name: 'noview-shop-cart-storage' },
    ),
    { name: 'CartStore' },
  ),
);
