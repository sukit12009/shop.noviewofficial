export type NewsCategory = 'announcement' | 'event' | 'product' | 'promotion';

export interface News {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: NewsCategory;
  publishedAt: string; // ISO date string
  isPinned?: boolean;
}
