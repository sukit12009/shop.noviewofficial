import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface CartItem {
  /** Unique key for this cart line: `${productId}|${color ?? ''}|${size ?? ''}` */
  variantKey: string;
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  color?: string;
  size?: string;
}

type AddItemInput = Omit<CartItem, 'variantKey' | 'quantity'> & { quantity?: number };

interface CartState {
  items: CartItem[];
  addItem: (item: AddItemInput) => void;
  removeItem: (variantKey: string) => void;
  updateQuantity: (variantKey: string, quantity: number) => void;
  clearCart: () => void;
}

function buildVariantKey(productId: string, color?: string, size?: string): string {
  return `${productId}|${color ?? ''}|${size ?? ''}`;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        items: [],

        addItem: (newItem) =>
          set((state) => {
            const vk = buildVariantKey(newItem.productId, newItem.color, newItem.size);
            const existing = state.items.find((i) => i.variantKey === vk);
            if (existing) {
              return {
                items: state.items.map((i) =>
                  i.variantKey === vk
                    ? { ...i, quantity: i.quantity + (newItem.quantity ?? 1) }
                    : i,
                ),
              };
            }
            return {
              items: [
                ...state.items,
                { ...newItem, variantKey: vk, quantity: newItem.quantity ?? 1 },
              ],
            };
          }),

        removeItem: (variantKey) =>
          set((state) => ({
            items: state.items.filter((i) => i.variantKey !== variantKey),
          })),

        updateQuantity: (variantKey, quantity) =>
          set((state) => ({
            items:
              quantity <= 0
                ? state.items.filter((i) => i.variantKey !== variantKey)
                : state.items.map((i) =>
                    i.variantKey === variantKey ? { ...i, quantity } : i,
                  ),
          })),

        clearCart: () => set({ items: [] }),
      }),
      { name: 'noview-shop-cart-storage' },
    ),
    { name: 'CartStore' },
  ),
);
