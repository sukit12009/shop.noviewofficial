'use client';

import { useMemo } from 'react';
import { useProductList } from '@/modules/product/hooks/use-product-list';
import { useOfficialGoods } from '@/modules/home/hooks/use-official-goods';
import { useWishlist } from './use-wishlist';
import type { CategoryItem } from '@/modules/category/hooks/useCategoryItems';

interface UseWishlistItemsResult {
  items: CategoryItem[];
  isLoading: boolean;
}

/**
 * Resolves full product data for every item in the current user's wishlist.
 * Searches across all data sources (products + official-goods).
 */
export function useWishlistItems(): UseWishlistItemsResult {
  const { ids } = useWishlist();
  const { products, isLoading: loadingProducts } = useProductList({ limit: 200 });
  const { goods, isLoading: loadingGoods } = useOfficialGoods();

  const items = useMemo<CategoryItem[]>(() => {
    if (ids.length === 0) return [];

    const productItems: CategoryItem[] = products
      .filter((p) => ids.includes(p.id))
      .map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        formattedPrice: p.formattedPrice,
        imageUrl: p.imageUrl,
        badge: p.badge,
      }));

    const goodItems: CategoryItem[] = goods
      .filter((g) => ids.includes(g.id))
      .map((g) => ({
        id: g.id,
        name: g.name,
        price: g.price,
        formattedPrice: g.formattedPrice,
        imageUrl: g.imageUrl,
        badge: g.isSoldOut ? 'Sold Out' : null,
      }));

    const all = [...productItems, ...goodItems];

    // Preserve wishlist order (order items were added)
    return ids
      .map((id) => all.find((i) => i.id === id))
      .filter((i): i is CategoryItem => Boolean(i));
  }, [ids, products, goods]);

  return {
    items,
    isLoading: loadingProducts || loadingGoods,
  };
}
