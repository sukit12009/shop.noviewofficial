import type { News } from '../entities/news';

export interface NewsRepository {
  getNews(): Promise<News[]>;
  getNewsById(id: string): Promise<News | null>;
}
