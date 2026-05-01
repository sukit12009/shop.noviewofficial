'use client';

import { useBannerList } from '@/modules/home/hooks/use-banner-list';
import { useProductList } from '@/modules/product/hooks/use-product-list';
import { useOfficialGoods } from '@/modules/home/hooks/use-official-goods';
import { useCart } from '@/shared/hooks/use-cart';
import { Header } from '@/modules/home/components/Header';
import { HeroBanner } from '@/modules/home/components/HeroBanner';
import { ProductSection } from '@/modules/home/components/ProductSection';
import { OfficialGoodsSection } from '@/modules/home/components/OfficialGoodsSection';
import { Footer } from '@/modules/layout/components/Footer';

export default function HomePage() {
  const { banners, isLoading: bannersLoading } = useBannerList();
  const { products, isLoading: productsLoading } = useProductList({ limit: 8 });
  const { goods, favorites, toggleFavorite, isLoading: goodsLoading } = useOfficialGoods();
  const { itemCount } = useCart();

  return (
    <div className="min-h-screen bg-white">
      <Header cartCount={itemCount} />
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
      <Footer />
    </div>
  );
}
