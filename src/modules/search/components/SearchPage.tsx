'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSearch } from '../hooks/use-search';
import { CategoryProductCard } from '@/modules/category/components/CategoryProductCard';
import { useT } from '@/shared/hooks/use-t';

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-2">
      <div className="aspect-square animate-pulse rounded-xl bg-gray-200" />
      <div className="h-3 w-3/4 animate-pulse rounded-full bg-gray-200" />
      <div className="h-3 w-1/2 animate-pulse rounded-full bg-gray-200" />
    </div>
  );
}

export function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useT();

  const initialQuery = searchParams.get('q') ?? '';
  const [inputValue, setInputValue] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  const { results, isLoading, normalisedQuery } = useSearch(initialQuery);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = inputValue.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    } else {
      router.push('/search');
    }
  }

  const hasQuery = normalisedQuery.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-gray-800">
            {t.search.breadcrumbHome}
          </Link>
          <span className="text-gray-300">›</span>
          <span className="font-semibold text-gray-800">{t.search.title}</span>
        </nav>

        {/* Title */}
        <h1 className="mb-8 text-center text-3xl font-black tracking-[0.15em] text-gray-900 uppercase">
          {t.search.title}
        </h1>

        {/* Search bar */}
        <form onSubmit={handleSubmit} className="mx-auto mb-10 max-w-2xl">
          <div className="flex overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm transition-shadow focus-within:border-orange-400 focus-within:shadow-md focus-within:ring-2 focus-within:ring-orange-100">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.search.placeholder}
              className="flex-1 bg-transparent px-5 py-4 text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-orange-500 px-6 py-4 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              <SearchIcon />
              <span className="hidden sm:inline">{t.search.searchBtn}</span>
            </button>
          </div>
        </form>

        {/* Results area */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : !hasQuery ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-sm text-gray-400">{t.search.emptyQuery}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-3">
            <p className="text-4xl">🔍</p>
            <p className="text-sm text-gray-500">{t.search.noResults(normalisedQuery)}</p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-gray-500">
              {t.search.showing(results.length, normalisedQuery)}
            </p>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {results.map((item) => (
                <CategoryProductCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
