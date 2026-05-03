'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useT } from '@/shared/hooks/use-t';
import { useLangStore } from '@/shared/store/lang-store';
import { getCategoryById } from '@/shared/config/categories';
import { useCategoryItems } from '@/modules/category/hooks/useCategoryItems';
import type { CategoryItem } from '@/modules/category/hooks/useCategoryItems';

interface CategorySectionProps {
  categoryId: string;
  /** Number of items to preview on home page */
  previewCount?: number;
  /** Alternate background between white and gray-50 */
  bgVariant?: 'white' | 'gray';
}

function ItemCard({ item }: { item: CategoryItem }) {
  return (
    <div className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={item.imageUrl || '/placeholder.png'}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        />
        {item.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-[11px] font-bold tracking-widest text-white">
            {item.badge}
          </span>
        )}
      </div>
      <div className="mt-3 space-y-0.5 px-0.5">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
          {item.name}
        </h3>
        <p className="text-sm font-bold text-gray-900">{item.formattedPrice}</p>
      </div>
    </div>
  );
}

function ItemSkeleton() {
  return (
    <div className="space-y-3">
      <div className="aspect-square animate-pulse rounded-xl bg-gray-200" />
      <div className="h-3 w-3/4 animate-pulse rounded-full bg-gray-200" />
      <div className="h-3 w-1/2 animate-pulse rounded-full bg-gray-200" />
    </div>
  );
}

export function CategorySection({
  categoryId,
  previewCount = 8,
  bgVariant = 'white',
}: CategorySectionProps) {
  const t = useT();
  const lang = useLangStore((s) => s.lang);
  const config = getCategoryById(categoryId);
  const { items, isLoading } = useCategoryItems(categoryId);

  if (!config) return null;

  const title = config.title[lang] ?? config.title.TH ?? config.title.EN ?? '';
  const preview = items.slice(0, previewCount);
  const bg = bgVariant === 'gray' ? 'bg-gray-50' : 'bg-white';

  return (
    <section className={`${bg} py-16`}>
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
            ? Array.from({ length: previewCount > 8 ? 8 : previewCount }).map((_, i) => (
                <ItemSkeleton key={i} />
              ))
            : preview.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
        </div>

        {/* View All */}
        {!isLoading && (
          <div className="mt-14 text-center">
            <Link
              href={`/category/${categoryId}?page=1`}
              className="inline-block rounded-full border-2 border-black px-12 py-3 text-sm font-bold tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white"
            >
              {t.products.viewAll}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
