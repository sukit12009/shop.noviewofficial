'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useNewsDetail } from '../hooks/use-news-detail';
import type { NewsCategory } from '../../../core/entities/news';

const CATEGORY_COLOR: Record<NewsCategory, string> = {
  announcement: 'bg-blue-100 text-blue-700',
  event: 'bg-purple-100 text-purple-700',
  product: 'bg-orange-100 text-orange-600',
  promotion: 'bg-green-100 text-green-700',
};

function Skeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex gap-2">
        <div className="h-4 w-16 animate-pulse rounded-full bg-gray-200" />
        <div className="h-4 w-24 animate-pulse rounded-full bg-gray-200" />
      </div>
      <div className="mb-4 h-8 w-full animate-pulse rounded-xl bg-gray-200" />
      <div className="mb-2 h-8 w-2/3 animate-pulse rounded-xl bg-gray-200" />
      <div className="mt-8 aspect-[16/9] w-full animate-pulse rounded-2xl bg-gray-200" />
      <div className="mt-8 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`h-4 animate-pulse rounded-full bg-gray-200 ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
        ))}
      </div>
    </div>
  );
}

/** Renders the news content string as paragraphs, with bold (**text**) support */
function ContentBody({ content }: { content: string }) {
  return (
    <div className="space-y-4 text-sm leading-8 text-gray-700">
      {content.split('\n\n').map((block, i) => {
        if (!block.trim()) return null;

        // Heading-like lines (no **) that are short
        const parts = block.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i}>
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**') ? (
                <strong key={j} className="font-bold text-gray-900">
                  {part.slice(2, -2)}
                </strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        );
      })}
    </div>
  );
}

interface NewsDetailPageProps {
  id: string;
}

export function NewsDetailPage({ id }: NewsDetailPageProps) {
  const { news, isLoading, isError } = useNewsDetail(id);

  if (isLoading) return <Skeleton />;

  if (isError || !news) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-4xl">📰</p>
        <h2 className="text-xl font-bold text-gray-800">ไม่พบข่าวนี้</h2>
        <Link
          href="/news"
          className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
        >
          ดูข่าวสารทั้งหมด
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-gray-800">หน้าแรก</Link>
          <span className="text-gray-300">›</span>
          <Link href="/news" className="transition hover:text-gray-800">ข่าวสาร</Link>
          <span className="text-gray-300">›</span>
          <span className="line-clamp-1 font-semibold text-gray-800">{news.title}</span>
        </nav>

        {/* Meta */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${CATEGORY_COLOR[news.category]}`}>
            {news.categoryLabel}
          </span>
          <span className="text-sm text-gray-400">{news.formattedDate}</span>
          {news.isPinned && (
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-bold text-orange-500">
              📌 ปักหมุด
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="mb-6 text-2xl font-black leading-snug text-gray-900 md:text-3xl">
          {news.title}
        </h1>

        {/* Hero image */}
        <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        {/* Excerpt */}
        <p className="mb-6 rounded-xl border-l-4 border-orange-400 bg-orange-50 px-5 py-4 text-sm font-medium leading-relaxed text-gray-700">
          {news.excerpt}
        </p>

        {/* Content */}
        <ContentBody content={news.content} />

        {/* Back link */}
        <div className="mt-12 border-t border-gray-100 pt-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-orange-500"
          >
            ← กลับไปหน้าข่าวสาร
          </Link>
        </div>
      </div>
    </div>
  );
}
