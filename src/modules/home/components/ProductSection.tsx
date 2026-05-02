import { HomeProductCard } from './HomeProductCard';
import type { ProductViewModel } from '../../product/presenters/product-presenter';

interface ProductSectionProps {
  title: string;
  products: ProductViewModel[];
  isLoading: boolean;
}

function ProductSkeleton() {
  return (
    <div className="space-y-3">
      <div className="aspect-square animate-pulse rounded-xl bg-gray-200" />
      <div className="h-3 w-3/4 animate-pulse rounded-full bg-gray-200" />
      <div className="h-3 w-1/2 animate-pulse rounded-full bg-gray-200" />
    </div>
  );
}

export function ProductSection({ title, products, isLoading }: ProductSectionProps) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black tracking-[0.25em] text-gray-900 uppercase md:text-4xl">
            {title}
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-12 bg-black" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : products.map((product) => (
                <HomeProductCard key={product.id} product={product} />
              ))}
        </div>

        {/* View All */}
        {!isLoading && (
          <div className="mt-14 text-center">
            <a
              href="/shop"
              className="inline-block rounded-full border-2 border-black px-12 py-3 text-sm font-bold tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white"
              suppressHydrationWarning
            >
              VIEW ALL
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
