'use client';

import { useQuery } from '@tanstack/react-query';
import { MockProductRepository } from '../../../infrastructure/repositories/mock-product-repository';
import { GetProductsUseCase } from '../../../core/use-cases/get-products';
import { presentProducts } from '../presenters/product-presenter';
import type { ProductViewModel } from '../presenters/product-presenter';

// TODO: swap to ProductRepositoryImpl when the real API is ready
const productRepository = new MockProductRepository();
const getProductsUseCase = new GetProductsUseCase(productRepository);

interface UseProductListParams {
  page?: number;
  limit?: number;
}

interface UseProductListResult {
  products: ProductViewModel[];
  total: number;
  page: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function useProductList(
  params: UseProductListParams = {},
): UseProductListResult {
  const { page = 1, limit = 20 } = params;

  const query = useQuery({
    queryKey: ['products', { page, limit }],
    queryFn: async () => {
      const result = await getProductsUseCase.execute({ page, limit });
      return {
        products: presentProducts(result.products),
        total: result.total,
        page: result.page,
      };
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    products: query.data?.products ?? [],
    total: query.data?.total ?? 0,
    page: query.data?.page ?? page,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
  };
}
