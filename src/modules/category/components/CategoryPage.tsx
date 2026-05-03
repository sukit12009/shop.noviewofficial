'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/shared/store/cart-store';
import { useT } from '@/shared/hooks/use-t';
import { useLangStore } from '@/shared/store/lang-store';
import { getCategoryById } from '@/shared/config/categories';
import { useCategoryItems } from '../hooks/useCategoryItems';
import type { CategoryItem } from '../hooks/useCategoryItems';

// ─── Types ────────────────────────────────────────────────────────────────────
type SortKey = 'default' | 'price_asc' | 'price_desc';
const PER_PAGE_OPTIONS = [12, 24, 48] as const;

// ─── Icons ────────────────────────────────────────────────────────────────────
function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
      fill={filled ? '#f97316' : 'none'} stroke={filled ? '#f97316' : 'currentColor'}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ─── Product card ─────────────────────────────────────────────────────────────
function CategoryProductCard({
  item,
  isFav,
  onToggleFav,
}: {
  item: CategoryItem;
  isFav: boolean;
  onToggleFav: (id: string) => void;
}) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const t = useT();

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ productId: item.id, name: item.name, price: item.price, imageUrl: item.imageUrl });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="group relative flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
        <Image src={item.imageUrl || '/placeholder.png'} alt={item.name} fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw" />

        {item.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-black px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-white">
            {item.badge}
          </span>
        )}

        <button type="button"
          onClick={(e) => { e.preventDefault(); onToggleFav(item.id); }}
          aria-label="Toggle wishlist"
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition hover:bg-white">
          <HeartIcon filled={isFav} />
        </button>

        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button type="button" onClick={handleAdd}
            className={`w-full py-2.5 text-xs font-bold tracking-wide text-white transition-colors ${added ? 'bg-green-500' : 'bg-black hover:bg-gray-800'}`}>
            {added ? t.category.added : `+ ${t.category.addToCart}`}
          </button>
        </div>
      </div>

      <div className="mt-2.5 space-y-0.5 px-0.5">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 hover:text-orange-500">
          {item.name}
        </h3>
        <p className="text-sm font-bold text-orange-500">{item.formattedPrice}</p>
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="aspect-square animate-pulse rounded-xl bg-gray-200" />
      <div className="h-3 w-3/4 animate-pulse rounded-full bg-gray-200" />
      <div className="h-3 w-1/3 animate-pulse rounded-full bg-gray-200" />
    </div>
  );
}

// ─── Pagination helper ────────────────────────────────────────────────────────
function buildPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '...')[] = [1];
  if (current > 3) pages.push('...');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
}

// ─── Main page ────────────────────────────────────────────────────────────────
interface CategoryPageProps {
  categoryId: string;
  initialPage: number;
}

export function CategoryPage({ categoryId, initialPage }: CategoryPageProps) {
  const t = useT();
  const router = useRouter();
  const lang = useLangStore((s) => s.lang);

  // Read category config
  const categoryConfig = getCategoryById(categoryId);
  const title = categoryConfig?.title[lang] ?? categoryConfig?.title.TH ?? categoryConfig?.title.EN ?? 'SHOP';

  // Fetch items via hook (data source determined by config)
  const { items: allItems, isLoading, notFound } = useCategoryItems(categoryId);

  // UI state
  const [page, setPage] = useState(initialPage);
  const [sortKey, setSortKey] = useState<SortKey>('default');
  const [perPage, setPerPage] = useState(12);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Sort
  const sorted = useMemo(() => {
    const copy = [...allItems];
    if (sortKey === 'price_asc') return copy.sort((a, b) => a.price - b.price);
    if (sortKey === 'price_desc') return copy.sort((a, b) => b.price - a.price);
    return copy;
  }, [allItems, sortKey]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const safePage = Math.min(page, totalPages);
  const fromIdx = (safePage - 1) * perPage;
  const toIdx = Math.min(fromIdx + perPage, sorted.length);
  const pageItems = sorted.slice(fromIdx, toIdx);

  const SORT_OPTIONS: { key: SortKey; label: string }[] = [
    { key: 'default', label: t.category.sortDefault },
    { key: 'price_asc', label: t.category.sortPriceAsc },
    { key: 'price_desc', label: t.category.sortPriceDesc },
  ];

  function handlePageChange(p: number) {
    setPage(p);
    router.push(`/category/${categoryId}?page=${p}`, { scroll: true });
  }

  function handleSortChange(key: SortKey) {
    setSortKey(key);
    setPage(1);
    router.push(`/category/${categoryId}?page=1`);
  }

  function handlePerPageChange(val: number) {
    setPerPage(val);
    setPage(1);
    router.push(`/category/${categoryId}?page=1`);
  }

  function toggleFav(id: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // 404-like state for unknown category
  if (notFound) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <p className="text-lg font-semibold text-gray-400">{t.category.noProducts}</p>
        <Link href="/" className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600">
          {t.category.breadcrumbHome}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-gray-800">{t.category.breadcrumbHome}</Link>
          <span className="text-gray-300">›</span>
          <span className="font-semibold text-gray-800">{title}</span>
        </nav>

        {/* Title */}
        <h1 className="mb-10 text-center text-3xl font-black tracking-[0.2em] text-gray-900 uppercase">
          {title}
        </h1>

        {/* Controls */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-semibold text-orange-500">
            {!isLoading && sorted.length > 0
              ? t.category.showing(fromIdx + 1, toIdx, sorted.length)
              : ''}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {/* Per page */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{t.category.showLabel}</span>
              <div className="relative">
                <select value={perPage} onChange={(e) => handlePerPageChange(Number(e.target.value))}
                  className="appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pl-3 pr-7 text-sm font-semibold text-gray-700 shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100">
                  {PER_PAGE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"><ChevronIcon /></span>
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{t.category.sortLabel}</span>
              <div className="relative">
                <select value={sortKey} onChange={(e) => handleSortChange(e.target.value as SortKey)}
                  className="appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pl-3 pr-7 text-sm font-semibold text-gray-700 shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100">
                  {SORT_OPTIONS.map(({ key, label }) => <option key={key} value={key}>{label}</option>)}
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"><ChevronIcon /></span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : pageItems.length === 0 ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-gray-400">{t.category.noProducts}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
            {pageItems.map((item) => (
              <CategoryProductCard key={item.id} item={item}
                isFav={favorites.has(item.id)} onToggleFav={toggleFav} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-1.5">
            <button type="button" onClick={() => handlePageChange(Math.max(1, safePage - 1))}
              disabled={safePage === 1}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-500 transition hover:border-orange-400 hover:text-orange-500 disabled:opacity-40">
              {t.category.prevPage}
            </button>

            {buildPageNumbers(safePage, totalPages).map((p, i) =>
              p === '...' ? (
                <span key={`e-${i}`} className="px-1 text-gray-400">…</span>
              ) : (
                <button key={p} type="button" onClick={() => handlePageChange(p)}
                  className={`h-9 w-9 rounded-lg text-sm font-bold transition ${p === safePage
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500'}`}>
                  {p}
                </button>
              )
            )}

            <button type="button" onClick={() => handlePageChange(Math.min(totalPages, safePage + 1))}
              disabled={safePage === totalPages}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-500 transition hover:border-orange-400 hover:text-orange-500 disabled:opacity-40">
              {t.category.nextPage}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
