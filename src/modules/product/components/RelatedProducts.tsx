'use client';

import Image from 'next/image';
import { useProductList } from '../hooks/use-product-list';
import type { ProductViewModel } from '../presenters/product-presenter';

interface RelatedProductsProps {
  currentProductId: string;
}

function RelatedCard({ product }: { product: ProductViewModel }) {
  return (
    <a href={`/products/${product.id}`} className="group block" suppressHydrationWarning>
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-black px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-white">
            {product.badge}
          </span>
        )}
      </div>
      <div className="mt-3 space-y-0.5 px-0.5">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm font-bold text-orange-500">{product.formattedPrice}</p>
      </div>
    </a>
  );
}

function CardSkeleton() {
  return (
    <div>
      <div className="aspect-square animate-pulse rounded-xl bg-gray-200" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-3/4 animate-pulse rounded-full bg-gray-200" />
        <div className="h-3 w-1/3 animate-pulse rounded-full bg-gray-200" />
      </div>
    </div>
  );
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const { products, isLoading } = useProductList({ limit: 5 });
  const related = products.filter((p) => p.id !== currentProductId).slice(0, 4);

  return (
    <section className="mt-16 border-t border-gray-100 pt-16">
      <h2 className="mb-8 text-center text-2xl font-bold tracking-wide text-gray-900">
        คุณอาจจะชอบสิ่งนี้
      </h2>
      <div className="h-0.5 mx-auto mb-10 w-10 bg-gray-300" />
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
          : related.map((p) => <RelatedCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
