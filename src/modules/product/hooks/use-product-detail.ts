'use client';

import { useQuery } from '@tanstack/react-query';
import { MockProductRepository } from '../../../infrastructure/repositories/mock-product-repository';
import { MockOfficialGoodRepository } from '../../../infrastructure/repositories/mock-official-good-repository';
import { GetCatalogItemUseCase } from '../../../core/use-cases/get-catalog-item';
import { presentProductDetail } from '../presenters/product-presenter';
import { presentOfficialGoodDetail } from '../../official-goods/presenters/official-good-detail-presenter';
import type { ProductDetailViewModel } from '../presenters/product-presenter';

const getCatalogItemUseCase = new GetCatalogItemUseCase(
  new MockProductRepository(),
  new MockOfficialGoodRepository(),
);

interface UseProductDetailResult {
  product: ProductDetailViewModel | null;
  isLoading: boolean;
  isError: boolean;
}

export function useProductDetail(id: string): UseProductDetailResult {
  const query = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const result = await getCatalogItemUseCase.execute(id);
      if (result.kind === 'product') return presentProductDetail(result.data);
      return presentOfficialGoodDetail(result.data);
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    product: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
