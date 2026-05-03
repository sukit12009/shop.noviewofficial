'use client';

import { useMemo } from 'react';
import { useProductList } from '@/modules/product/hooks/use-product-list';
import { useOfficialGoods } from '@/modules/home/hooks/use-official-goods';
import type { CategoryItem } from '@/modules/category/hooks/useCategoryItems';

interface UseSearchResult {
  results: CategoryItem[];
  isLoading: boolean;
  /** The normalised query that was searched (trimmed, lowercase) */
  normalisedQuery: string;
}

/**
 * Searches products and official-goods by name (case-insensitive, substring match).
 * Reuses React Query cache from existing hooks — no extra network requests.
 */
export function useSearch(query: string): UseSearchResult {
  const trimmed = query.trim();
  const normalised = trimmed.toLowerCase();

  const { products, isLoading: loadingProducts } = useProductList({ limit: 200 });
  const { goods, isLoading: loadingGoods } = useOfficialGoods();

  const results = useMemo<CategoryItem[]>(() => {
    if (!normalised) return [];

    const matchedProducts: CategoryItem[] = products
      .filter((p) => p.name.toLowerCase().includes(normalised))
      .map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        formattedPrice: p.formattedPrice,
        imageUrl: p.imageUrl,
        badge: p.badge,
      }));

    const matchedGoods: CategoryItem[] = goods
      .filter((g) => g.name.toLowerCase().includes(normalised))
      .map((g) => ({
        id: g.id,
        name: g.name,
        price: g.price,
        formattedPrice: g.formattedPrice,
        imageUrl: g.imageUrl,
        badge: g.isSoldOut ? 'Sold Out' : null,
      }));

    return [...matchedProducts, ...matchedGoods];
  }, [normalised, products, goods]);

  return {
    results,
    isLoading: loadingProducts || loadingGoods,
    normalisedQuery: trimmed,
  };
}
