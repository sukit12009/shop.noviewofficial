'use client';

import { useQuery } from '@tanstack/react-query';
import { MockNewsRepository } from '../../../infrastructure/repositories/mock-news-repository';
import { GetNewsUseCase } from '../../../core/use-cases/get-news';
import { presentNewsList } from '../presenters/news-presenter';
import type { NewsViewModel } from '../presenters/news-presenter';

const newsRepository = new MockNewsRepository();
const getNewsUseCase = new GetNewsUseCase(newsRepository);

export function useNewsList(): { news: NewsViewModel[]; isLoading: boolean } {
  const query = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const list = await getNewsUseCase.execute();
      return presentNewsList(list);
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { news: query.data ?? [], isLoading: query.isLoading };
}
