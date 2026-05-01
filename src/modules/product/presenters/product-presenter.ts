import type { Product } from '../../../core/entities/product';

export interface ProductViewModel {
  id: string;
  name: string;
  description: string;
  formattedPrice: string;
  imageUrl: string;
  category: string;
  /** Contextual badge text, null if none applies. */
  badge: string | null;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0,
  }).format(price);
}

function resolveBadge(product: Product): string | null {
  if (product.isNew) return 'NEW';
  if (product.stock <= 5) return 'Low Stock';
  return null;
}

export function presentProduct(product: Product): ProductViewModel {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    formattedPrice: formatPrice(product.price),
    imageUrl: product.imageUrl,
    category: product.category,
    badge: resolveBadge(product),
  };
}

export function presentProducts(products: Product[]): ProductViewModel[] {
  return products.map(presentProduct);
}
