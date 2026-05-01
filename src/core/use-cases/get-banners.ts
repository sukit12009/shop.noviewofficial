import type { BannerRepository } from '../repositories/banner-repository';
import type { Banner } from '../entities/banner';

export class GetBannersUseCase {
  constructor(private readonly repository: BannerRepository) {}

  async execute(): Promise<Banner[]> {
    return this.repository.getBanners();
  }
}
