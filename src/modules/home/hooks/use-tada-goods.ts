'use client';

import { useQuery } from '@tanstack/react-query';
import { MockTadaGoodsRepository } from '../../../infrastructure/repositories/mock-official-good-repository';
import { GetOfficialGoodsUseCase } from '../../../core/use-cases/get-official-goods';
import { presentOfficialGoods } from '../presenters/official-good-presenter';
import type { OfficialGoodViewModel } from '../presenters/official-good-presenter';

const tadaRepo = new MockTadaGoodsRepository();
const getUseCase = new GetOfficialGoodsUseCase(tadaRepo);

interface UseTadaGoodsResult {
  goods: OfficialGoodViewModel[];
  isLoading: boolean;
}

export function useTadaGoods(): UseTadaGoodsResult {
  const query = useQuery({
    queryKey: ['tada-goods'],
    queryFn: async () => {
      const goods = await getUseCase.execute();
      return presentOfficialGoods(goods);
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { goods: query.data ?? [], isLoading: query.isLoading };
}
