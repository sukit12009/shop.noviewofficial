'use client';

import { useMemo } from 'react';
import { useProductList } from '@/modules/product/hooks/use-product-list';
import { useOfficialGoods } from '@/modules/home/hooks/use-official-goods';
import { getCategoryById } from '@/shared/config/categories';

export interface CategoryItem {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  imageUrl: string;
  /** Badge text shown on the card (e.g. "NEW", "Sold Out") or null */
  badge: string | null;
}

interface UseCategoryItemsResult {
  items: CategoryItem[];
  isLoading: boolean;
  /** true when the category id is not registered in MOCK_CATEGORIES */
  notFound: boolean;
}

/**
 * Fetches items for a category based on its registered dataSource.
 * Adding a new category only requires updating MOCK_CATEGORIES config.
 */
export function useCategoryItems(categoryId: string): UseCategoryItemsResult {
  const config = getCategoryById(categoryId);

  const { products, isLoading: loadingProducts } = useProductList({ limit: 200 });
  const { goods, isLoading: loadingGoods } = useOfficialGoods();

  const items = useMemo<CategoryItem[]>(() => {
    if (!config) return [];

    if (config.dataSource === 'products') {
      return products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        formattedPrice: p.formattedPrice,
        imageUrl: p.imageUrl,
        badge: p.badge,
      }));
    }

    if (config.dataSource === 'official-goods') {
      return goods.map((g) => ({
        id: g.id,
        name: g.name,
        price: g.price,
        formattedPrice: g.formattedPrice,
        imageUrl: g.imageUrl,
        badge: g.isSoldOut ? 'Sold Out' : null,
      }));
    }

    return [];
  }, [config, products, goods]);

  const isLoading =
    config?.dataSource === 'products' ? loadingProducts
    : config?.dataSource === 'official-goods' ? loadingGoods
    : false;

  return { items, isLoading, notFound: !config };
}
