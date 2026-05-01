import type { OfficialGoodRepository } from '../../core/repositories/official-good-repository';
import type { OfficialGood } from '../../core/entities/official-good';

const MOCK_OFFICIAL_GOODS: OfficialGood[] = [
  {
    id: 'og-1',
    name: 'NADAO Official Light Stick Ver.2',
    price: 1490,
    imageUrl:
      'https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?w=400&q=80',
    isSoldOut: false,
  },
  {
    id: 'og-2',
    name: 'TADA Season 3 Photobook',
    price: 890,
    imageUrl:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
    isSoldOut: true,
  },
  {
    id: 'og-3',
    name: 'NADAO Logo Tote Bag',
    price: 590,
    imageUrl:
      'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=400&q=80',
    isSoldOut: false,
  },
  {
    id: 'og-4',
    name: 'BUS Official Acrylic Keychain',
    price: 290,
    imageUrl:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
    isSoldOut: false,
  },
  {
    id: 'og-5',
    name: 'TADA x NADAO Ceramic Mug',
    price: 490,
    imageUrl:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80',
    isSoldOut: true,
  },
  {
    id: 'og-6',
    name: 'Official Fan Poster Set (A3)',
    price: 350,
    imageUrl:
      'https://images.unsplash.com/photo-1579541591970-288a18775fc3?w=400&q=80',
    isSoldOut: false,
  },
  {
    id: 'og-7',
    name: 'NADAO Sticker Pack Vol.1',
    price: 180,
    imageUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    isSoldOut: false,
  },
  {
    id: 'og-8',
    name: 'BUS Signed Mini Album',
    price: 1290,
    imageUrl:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
    isSoldOut: true,
  },
];

export class MockOfficialGoodRepository implements OfficialGoodRepository {
  async getOfficialGoods(): Promise<OfficialGood[]> {
    await new Promise((r) => setTimeout(r, 500));
    return MOCK_OFFICIAL_GOODS;
  }
}
