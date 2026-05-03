import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface WishlistState {
  /** userId → product ids. 'guest' used when not logged in. */
  map: Record<string, string[]>;
  toggle: (userId: string, productId: string) => void;
  getIds: (userId: string) => string[];
  clear: (userId: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  devtools(
    persist(
      (set, get) => ({
        map: {},
        toggle: (userId, productId) =>
          set((s) => {
            const current = s.map[userId] ?? [];
            const next = current.includes(productId)
              ? current.filter((id) => id !== productId)
              : [...current, productId];
            return { map: { ...s.map, [userId]: next } };
          }),
        getIds: (userId) => get().map[userId] ?? [],
        clear: (userId) =>
          set((s) => ({ map: { ...s.map, [userId]: [] } })),
      }),
      { name: 'noview-shop-wishlist-storage' },
    ),
    { name: 'WishlistStore' },
  ),
);
