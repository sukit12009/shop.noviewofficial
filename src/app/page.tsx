'use client';

import { useBannerList } from '@/modules/home/hooks/use-banner-list';
import { HeroBanner } from '@/modules/home/components/HeroBanner';
import { CategorySection } from '@/modules/home/components/CategorySection';
import { MOCK_CATEGORIES } from '@/shared/config/categories';

export default function HomePage() {
  const { banners, isLoading: bannersLoading } = useBannerList();

  return (
    <div className="min-h-screen bg-white">
      <HeroBanner banners={banners} isLoading={bannersLoading} />

      {MOCK_CATEGORIES.map((category, index) => (
        <CategorySection
          key={category.id}
          categoryId={category.id}
          previewCount={8}
          bgVariant={index % 2 === 0 ? 'white' : 'gray'}
        />
      ))}
    </div>
  );
}
