'use client';

import { useQuery } from '@tanstack/react-query';
import { MockBusGoodsRepository } from '../../../infrastructure/repositories/mock-official-good-repository';
import { GetOfficialGoodsUseCase } from '../../../core/use-cases/get-official-goods';
import { presentOfficialGoods } from '../presenters/official-good-presenter';
import type { OfficialGoodViewModel } from '../presenters/official-good-presenter';

const busRepo = new MockBusGoodsRepository();
const getUseCase = new GetOfficialGoodsUseCase(busRepo);

interface UseBusGoodsResult {
  goods: OfficialGoodViewModel[];
  isLoading: boolean;
}

export function useBusGoods(): UseBusGoodsResult {
  const query = useQuery({
    queryKey: ['bus-goods'],
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
