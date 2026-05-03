import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User } from '../../core/entities/user';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        logout: () => set({ user: null }),
      }),
      { name: 'noview-shop-auth-storage' },
    ),
    { name: 'AuthStore' },
  ),
);
