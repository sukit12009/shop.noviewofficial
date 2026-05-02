'use client';

import { useQuery } from '@tanstack/react-query';
import { MockOfficialGoodRepository } from '../../../infrastructure/repositories/mock-official-good-repository';
import { GetOfficialGoodByIdUseCase } from '../../../core/use-cases/get-official-good-by-id';
import { presentOfficialGoodDetail } from '../presenters/official-good-detail-presenter';
import type { ProductDetailViewModel } from '../../product/presenters/product-presenter';

const repository = new MockOfficialGoodRepository();
const getOfficialGoodByIdUseCase = new GetOfficialGoodByIdUseCase(repository);

interface UseOfficialGoodDetailResult {
  good: ProductDetailViewModel | null;
  isLoading: boolean;
  isError: boolean;
}

export function useOfficialGoodDetail(id: string): UseOfficialGoodDetailResult {
  const query = useQuery({
    queryKey: ['official-good', id],
    queryFn: async () => {
      const good = await getOfficialGoodByIdUseCase.execute(id);
      return presentOfficialGoodDetail(good);
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    good: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
