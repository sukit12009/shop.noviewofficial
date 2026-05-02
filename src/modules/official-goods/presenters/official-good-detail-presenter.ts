import type { OfficialGood } from '../../../core/entities/official-good';
import type { ProductDetailViewModel } from '../../product/presenters/product-presenter';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0,
  }).format(price);
}

export function presentOfficialGoodDetail(
  good: OfficialGood,
): ProductDetailViewModel {
  return {
    id: good.id,
    name: good.name,
    price: good.price,
    formattedPrice: formatPrice(good.price),
    imageUrl: good.imageUrl,
    images: good.images?.length ? good.images : [good.imageUrl],
    category: 'NADAO OFFICIAL GOODS',
    badge: good.isSoldOut ? 'Sold Out' : null,
    description: good.details ?? good.name,
    colors: good.colors ?? [],
    sizes: good.sizes ?? [],
    details: good.details ?? good.name,
    sizeChart: good.sizeChart ?? '',
    isSoldOut: good.isSoldOut,
    stock: good.isSoldOut ? 0 : 99,
  };
}
