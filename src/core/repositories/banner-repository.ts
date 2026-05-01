import type { Banner } from '../entities/banner';

export interface BannerRepository {
  getBanners(): Promise<Banner[]>;
}
