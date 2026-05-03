'use client';

import { useMemo } from 'react';
import { useProductList } from '@/modules/product/hooks/use-product-list';
import { useOfficialGoods } from '@/modules/home/hooks/use-official-goods';
import { useTadaGoods } from '@/modules/home/hooks/use-tada-goods';
import { useBusGoods } from '@/modules/home/hooks/use-bus-goods';
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
function toItems(goods: { id: string; name: string; price: number; formattedPrice: string; imageUrl: string; isSoldOut: boolean }[]): CategoryItem[] {
  return goods.map((g) => ({
    id: g.id,
    name: g.name,
    price: g.price,
    formattedPrice: g.formattedPrice,
    imageUrl: g.imageUrl,
    badge: g.isSoldOut ? 'Sold Out' : null,
  }));
}

export function useCategoryItems(categoryId: string): UseCategoryItemsResult {
  const config = getCategoryById(categoryId);

  // All hooks called unconditionally (Rules of Hooks)
  const { products, isLoading: loadingProducts } = useProductList({ limit: 200 });
  const { goods, isLoading: loadingGoods } = useOfficialGoods();
  const { goods: tadaGoods, isLoading: loadingTada } = useTadaGoods();
  const { goods: busGoods, isLoading: loadingBus } = useBusGoods();

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

    if (config.dataSource === 'official-goods') return toItems(goods);
    if (config.dataSource === 'tada-artist') return toItems(tadaGoods);
    if (config.dataSource === 'bus-artist') return toItems(busGoods);

    return [];
  }, [config, products, goods, tadaGoods, busGoods]);

  const isLoading =
    config?.dataSource === 'products' ? loadingProducts
    : config?.dataSource === 'official-goods' ? loadingGoods
    : config?.dataSource === 'tada-artist' ? loadingTada
    : config?.dataSource === 'bus-artist' ? loadingBus
    : false;

  return { items, isLoading, notFound: !config };
}
