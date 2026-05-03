import type { NewsRepository } from '../repositories/news-repository';
import type { News } from '../entities/news';

export class GetNewsUseCase {
  constructor(private readonly repository: NewsRepository) {}

  async execute(): Promise<News[]> {
    return this.repository.getNews();
  }
}
