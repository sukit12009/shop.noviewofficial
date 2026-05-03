import type { News, NewsCategory } from '../../../core/entities/news';

export interface NewsViewModel {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: NewsCategory;
  categoryLabel: string;
  formattedDate: string;
  isPinned: boolean;
}

export interface NewsDetailViewModel extends NewsViewModel {
  content: string;
}

const CATEGORY_LABELS: Record<NewsCategory, string> = {
  announcement: 'ประกาศ',
  event: 'อีเวนต์',
  product: 'สินค้าใหม่',
  promotion: 'โปรโมชัน',
};

const CATEGORY_LABELS_EN: Record<NewsCategory, string> = {
  announcement: 'Announcement',
  event: 'Event',
  product: 'New Product',
  promotion: 'Promotion',
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso));
}

export function presentNews(news: News): NewsViewModel {
  return {
    id: news.id,
    title: news.title,
    excerpt: news.excerpt,
    imageUrl: news.imageUrl,
    category: news.category,
    categoryLabel: CATEGORY_LABELS[news.category],
    formattedDate: formatDate(news.publishedAt),
    isPinned: news.isPinned ?? false,
  };
}

export function presentNewsDetail(news: News): NewsDetailViewModel {
  return {
    ...presentNews(news),
    content: news.content,
  };
}

export function presentNewsList(list: News[]): NewsViewModel[] {
  return list.map(presentNews);
}

export { CATEGORY_LABELS, CATEGORY_LABELS_EN };
