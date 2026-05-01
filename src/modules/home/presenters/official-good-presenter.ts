import type { OfficialGood } from '../../../core/entities/official-good';

export interface OfficialGoodViewModel {
  id: string;
  name: string;
  formattedPrice: string;
  imageUrl: string;
  isSoldOut: boolean;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0,
  }).format(price);
}

export function presentOfficialGood(good: OfficialGood): OfficialGoodViewModel {
  return {
    id: good.id,
    name: good.name,
    formattedPrice: formatPrice(good.price),
    imageUrl: good.imageUrl,
    isSoldOut: good.isSoldOut,
  };
}

export function presentOfficialGoods(
  goods: OfficialGood[],
): OfficialGoodViewModel[] {
  return goods.map(presentOfficialGood);
}
