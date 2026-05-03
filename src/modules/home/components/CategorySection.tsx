'use client';

import Link from 'next/link';
import { useT } from '@/shared/hooks/use-t';
import { useLangStore } from '@/shared/store/lang-store';
import { getCategoryById } from '@/shared/config/categories';
import { useCategoryItems } from '@/modules/category/hooks/useCategoryItems';
import { CategoryProductCard } from '@/modules/category/components/CategoryProductCard';

interface CategorySectionProps {
  categoryId: string;
  previewCount?: number;
  bgVariant?: 'white' | 'gray';
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
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black tracking-[0.25em] text-gray-900 uppercase md:text-4xl">
            {title}
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-12 bg-black" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: Math.min(previewCount, 8) }).map((_, i) => (
                <ItemSkeleton key={i} />
              ))
            : preview.map((item) => (
                <CategoryProductCard key={item.id} item={item} />
              ))}
        </div>

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
