'use client';

import { useQuery } from '@tanstack/react-query';
import { MockNewsRepository } from '../../../infrastructure/repositories/mock-news-repository';
import { GetNewsByIdUseCase } from '../../../core/use-cases/get-news-by-id';
import { presentNewsDetail } from '../presenters/news-presenter';
import type { NewsDetailViewModel } from '../presenters/news-presenter';

const newsRepository = new MockNewsRepository();
const getNewsByIdUseCase = new GetNewsByIdUseCase(newsRepository);

export function useNewsDetail(id: string): {
  news: NewsDetailViewModel | null;
  isLoading: boolean;
  isError: boolean;
} {
  const query = useQuery({
    queryKey: ['news', id],
    queryFn: async () => {
      const item = await getNewsByIdUseCase.execute(id);
      if (!item) throw new Error('ไม่พบข่าวนี้');
      return presentNewsDetail(item);
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    news: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
