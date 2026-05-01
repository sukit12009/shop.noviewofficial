'use client';

import { useQuery } from '@tanstack/react-query';
import { MockBannerRepository } from '../../../infrastructure/repositories/mock-banner-repository';
import { GetBannersUseCase } from '../../../core/use-cases/get-banners';
import { presentBanners } from '../presenters/banner-presenter';
import type { BannerViewModel } from '../presenters/banner-presenter';

const bannerRepository = new MockBannerRepository();
const getBannersUseCase = new GetBannersUseCase(bannerRepository);

interface UseBannerListResult {
  banners: BannerViewModel[];
  isLoading: boolean;
  isError: boolean;
}

export function useBannerList(): UseBannerListResult {
  const query = useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const banners = await getBannersUseCase.execute();
      return presentBanners(banners);
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    banners: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
