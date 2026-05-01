import type { BannerRepository } from '../../core/repositories/banner-repository';
import type { Banner } from '../../core/entities/banner';

const MOCK_BANNERS: Banner[] = [
  {
    id: '1',
    title: 'BUS OFFICIAL\nLIGHT STICK',
    subtitle: 'Limited Edition — Available Now',
    imageUrl:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80',
    linkUrl: '/shop/light-stick',
  },
  {
    id: '2',
    title: 'TADA SUMMER\nCOLLECTION',
    subtitle: 'New Arrivals — Shop the Look',
    imageUrl:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80',
    linkUrl: '/shop/summer',
  },
  {
    id: '3',
    title: 'EXCLUSIVE\nMERCH DROP',
    subtitle: "Don't Miss Out — Limited Stock",
    imageUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    linkUrl: '/shop/exclusive',
  },
];

export class MockBannerRepository implements BannerRepository {
  async getBanners(): Promise<Banner[]> {
    await new Promise((r) => setTimeout(r, 300));
    return MOCK_BANNERS;
  }
}
