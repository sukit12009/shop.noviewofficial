'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MockOfficialGoodRepository } from '../../../infrastructure/repositories/mock-official-good-repository';
import { GetOfficialGoodsUseCase } from '../../../core/use-cases/get-official-goods';
import { presentOfficialGoods } from '../presenters/official-good-presenter';
import type { OfficialGoodViewModel } from '../presenters/official-good-presenter';

const officialGoodRepository = new MockOfficialGoodRepository();
const getOfficialGoodsUseCase = new GetOfficialGoodsUseCase(officialGoodRepository);

interface UseOfficialGoodsResult {
  goods: OfficialGoodViewModel[];
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  isLoading: boolean;
  isError: boolean;
}

export function useOfficialGoods(): UseOfficialGoodsResult {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const query = useQuery({
    queryKey: ['official-goods'],
    queryFn: async () => {
      const goods = await getOfficialGoodsUseCase.execute();
      return presentOfficialGoods(goods);
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    goods: query.data ?? [],
    favorites,
    toggleFavorite,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
