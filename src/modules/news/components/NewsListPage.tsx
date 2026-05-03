'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useNewsList } from '../hooks/use-news-list';
import type { NewsViewModel } from '../presenters/news-presenter';
import type { NewsCategory } from '../../../core/entities/news';

const CATEGORY_COLOR: Record<NewsCategory, string> = {
  announcement: 'bg-blue-100 text-blue-700',
  event: 'bg-purple-100 text-purple-700',
  product: 'bg-orange-100 text-orange-600',
  promotion: 'bg-green-100 text-green-700',
};

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="aspect-[16/9] animate-pulse bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 animate-pulse rounded-full bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded-full bg-gray-200" />
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-gray-200" />
        <div className="h-3 w-1/2 animate-pulse rounded-full bg-gray-200" />
      </div>
    </div>
  );
}

function NewsCard({ item }: { item: NewsViewModel }) {
  return (
    <Link
      href={`/news/${item.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {item.isPinned && (
          <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-white">
            📌 ปักหมุด
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${CATEGORY_COLOR[item.category]}`}>
            {item.categoryLabel}
          </span>
          <span className="text-xs text-gray-400">{item.formattedDate}</span>
        </div>

        <h2 className="line-clamp-2 text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-orange-500">
          {item.title}
        </h2>

        <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">
          {item.excerpt}
        </p>

        <span className="mt-auto pt-2 text-xs font-semibold text-orange-500 transition-colors group-hover:text-orange-600">
          อ่านต่อ →
        </span>
      </div>
    </Link>
  );
}

function PinnedCard({ item }: { item: NewsViewModel }) {
  return (
    <Link
      href={`/news/${item.id}`}
      className="group col-span-full flex flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-shadow hover:shadow-md md:flex-row"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 md:aspect-auto md:w-2/5">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-white">
          📌 ปักหมุด
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-3 p-6 md:p-8">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${CATEGORY_COLOR[item.category]}`}>
            {item.categoryLabel}
          </span>
          <span className="text-xs text-gray-400">{item.formattedDate}</span>
        </div>
        <h2 className="text-lg font-black leading-snug text-gray-900 transition-colors group-hover:text-orange-500 md:text-xl">
          {item.title}
        </h2>
        <p className="line-clamp-3 text-sm leading-relaxed text-gray-500">
          {item.excerpt}
        </p>
        <span className="text-sm font-semibold text-orange-500 transition-colors group-hover:text-orange-600">
          อ่านต่อ →
        </span>
      </div>
    </Link>
  );
}

export function NewsListPage() {
  const { news, isLoading } = useNewsList();

  const pinned = news.filter((n) => n.isPinned);
  const regular = news.filter((n) => !n.isPinned);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-gray-800">หน้าแรก</Link>
          <span className="text-gray-300">›</span>
          <span className="font-semibold text-gray-800">ข่าวสารและประกาศ</span>
        </nav>

        <h1 className="mb-10 text-center text-3xl font-black tracking-[0.15em] text-gray-900 uppercase">
          NEWS
        </h1>

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Pinned cards — full-width */}
            {pinned.map((item) => (
              <PinnedCard key={item.id} item={item} />
            ))}
            {/* Regular cards */}
            {regular.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
