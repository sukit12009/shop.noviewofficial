import type { NewsRepository } from '../repositories/news-repository';
import type { News } from '../entities/news';

export class GetNewsByIdUseCase {
  constructor(private readonly repository: NewsRepository) {}

  async execute(id: string): Promise<News | null> {
    return this.repository.getNewsById(id);
  }
}
