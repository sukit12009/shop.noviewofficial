'use client';

import { useProductDetail } from '../hooks/use-product-detail';
import { ProductImageGallery } from './ProductImageGallery';
import { ProductInfo } from './ProductInfo';
import { ProductTabs } from './ProductTabs';
import { RelatedProducts } from './RelatedProducts';

interface ProductDetailPageProps {
  id: string;
}

function Breadcrumb({ name }: { name: string }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500">
      <a href="/" className="hover:text-gray-800 transition" suppressHydrationWarning>
        หน้าแรก
      </a>
      <span className="text-gray-400">›</span>
      <a href="/shop" className="hover:text-gray-800 transition" suppressHydrationWarning>
        สินค้า
      </a>
      <span className="text-gray-400">›</span>
      <span className="text-gray-800 font-medium line-clamp-1">{name}</span>
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
          <div className="h-4 w-1/2 animate-pulse rounded-full bg-gray-200" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-gray-200" />
          <div className="mt-6 h-12 w-full animate-pulse rounded-xl bg-gray-200" />
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
        href="/shop"
        className="mt-2 rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition"
        suppressHydrationWarning
      >
        ดูสินค้าทั้งหมด
      </a>
    </div>
  );
}

export function ProductDetailPage({ id }: ProductDetailPageProps) {
  const { product, isLoading, isError } = useProductDetail(id);

  if (isLoading) return <Skeleton />;
  if (isError || !product) return <NotFound />;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb name={product.name} />

        {/* Main section */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <ProductImageGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} />
        </div>

        {/* Tabs: details + size chart */}
        <ProductTabs product={product} />

        {/* Related products */}
        <RelatedProducts currentProductId={id} />
      </div>
    </div>
  );
}
