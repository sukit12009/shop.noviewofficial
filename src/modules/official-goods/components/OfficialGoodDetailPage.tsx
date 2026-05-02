'use client';

import { useOfficialGoodDetail } from '../hooks/use-official-good-detail';
import { ProductImageGallery } from '../../product/components/ProductImageGallery';
import { ProductInfo } from '../../product/components/ProductInfo';
import { ProductTabs } from '../../product/components/ProductTabs';
import { RelatedOfficialGoods } from './RelatedOfficialGoods';

interface OfficialGoodDetailPageProps {
  id: string;
}

function Breadcrumb({ name }: { name: string }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500">
      <a href="/" className="hover:text-gray-800 transition" suppressHydrationWarning>
        หน้าแรก
      </a>
      <span className="text-gray-400">›</span>
      <a href="/#official-goods" className="hover:text-gray-800 transition" suppressHydrationWarning>
        OFFICIAL GOODS
      </a>
      <span className="text-gray-400">›</span>
      <span className="line-clamp-1 font-medium text-gray-800">{name}</span>
    </nav>
  );
}

function Skeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="h-4 w-48 animate-pulse rounded-full bg-gray-200 mb-8" />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-xl bg-gray-200" />
        <div className="space-y-4">
          <div className="h-6 w-3/4 animate-pulse rounded-full bg-gray-200" />
          <div className="h-6 w-1/3 animate-pulse rounded-full bg-gray-200" />
          <div className="h-12 w-full animate-pulse rounded-xl bg-gray-200 mt-6" />
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-5xl">🔍</p>
      <h2 className="text-xl font-bold text-gray-800">ไม่พบสินค้านี้</h2>
      <p className="text-gray-500">สินค้าที่คุณค้นหาอาจถูกลบออกหรือไม่มีอยู่ในระบบ</p>
      <a
        href="/#official-goods"
        className="mt-2 rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition"
        suppressHydrationWarning
      >
        ดู Official Goods ทั้งหมด
      </a>
    </div>
  );
}

export function OfficialGoodDetailPage({ id }: OfficialGoodDetailPageProps) {
  const { good, isLoading, isError } = useOfficialGoodDetail(id);

  if (isLoading) return <Skeleton />;
  if (isError || !good) return <NotFound />;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb name={good.name} />

        {/* Main section: gallery + info */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <ProductImageGallery images={good.images} productName={good.name} />
          <ProductInfo product={good} />
        </div>

        {/* Tabs */}
        <ProductTabs product={good} />

        {/* Related official goods */}
        <RelatedOfficialGoods currentId={id} />
      </div>
    </div>
  );
}
