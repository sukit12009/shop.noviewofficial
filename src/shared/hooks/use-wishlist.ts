'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/auth-store';
import { useWishlistStore } from '../store/wishlist-store';
import { useToastStore } from '../store/toast-store';
import { translations } from '../i18n/translations';
import { useLangStore } from '../store/lang-store';

const GUEST_ID = 'guest';

interface UseWishlistResult {
  ids: string[];
  has: (productId: string) => boolean;
  /** Toggles wishlist. Redirects to /login if not authenticated. */
  toggle: (productId: string) => void;
  clear: () => void;
  isAuthenticated: boolean;
}

export function useWishlist(): UseWishlistResult {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const user = useAuthStore((s) => s.user);
  const userId = user?.id ?? GUEST_ID;
  const isAuthenticated = userId !== GUEST_ID;

  const map = useWishlistStore((s) => s.map);
  const toggleStore = useWishlistStore((s) => s.toggle);
  const clearStore = useWishlistStore((s) => s.clear);
  const addToast = useToastStore((s) => s.add);
  const lang = useLangStore((s) => s.lang);

  useEffect(() => { setMounted(true); }, []);

  const ids = mounted ? (map[userId] ?? []) : [];

  const toggle = (productId: string) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    const wasAdded = !(map[userId] ?? []).includes(productId);
    toggleStore(userId, productId);
    const t = translations[lang].toast;
    addToast(wasAdded ? t.addedToWishlist : t.removedFromWishlist, wasAdded ? 'success' : 'error');
  };

  return {
    ids,
    has: (productId) => ids.includes(productId),
    toggle,
    clear: () => clearStore(userId),
    isAuthenticated,
  };
}
