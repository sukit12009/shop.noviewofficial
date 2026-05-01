import type { Banner } from '../../../core/entities/banner';

export interface BannerViewModel {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkUrl: string;
}

export function presentBanner(banner: Banner): BannerViewModel {
  return {
    id: banner.id,
    title: banner.title,
    subtitle: banner.subtitle,
    imageUrl: banner.imageUrl,
    linkUrl: banner.linkUrl,
  };
}

export function presentBanners(banners: Banner[]): BannerViewModel[] {
  return banners.map(presentBanner);
}
