'use client';

import { useBannerList } from '@/modules/home/hooks/use-banner-list';
import { useProductList } from '@/modules/product/hooks/use-product-list';
import { useOfficialGoods } from '@/modules/home/hooks/use-official-goods';
import { HeroBanner } from '@/modules/home/components/HeroBanner';
import { ProductSection } from '@/modules/home/components/ProductSection';
import { OfficialGoodsSection } from '@/modules/home/components/OfficialGoodsSection';

export default function HomePage() {
  const { banners, isLoading: bannersLoading } = useBannerList();
  const { products, isLoading: productsLoading } = useProductList({ limit: 8 });
  const { goods, favorites, toggleFavorite, isLoading: goodsLoading } = useOfficialGoods();

  return (
    <div className="min-h-screen bg-white">
      <HeroBanner banners={banners} isLoading={bannersLoading} />
      <ProductSection
        title="TADA MERCH"
        products={products}
        isLoading={productsLoading}
      />
      <OfficialGoodsSection
        goods={goods}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        isLoading={goodsLoading}
      />
    </div>
  );
}
