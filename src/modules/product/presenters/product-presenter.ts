import type { Product } from '../../../core/entities/product';

export interface ProductViewModel {
  id: string;
  name: string;
  description: string;
  formattedPrice: string;
  imageUrl: string;
  category: string;
  badge: string | null;
}

export interface ProductDetailViewModel {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  imageUrl: string;
  images: string[];
  category: string;
  badge: string | null;
  description: string;
  colors: { label: string; value: string }[];
  sizes: string[];
  details: string;
  sizeChart: string;
  isSoldOut: boolean;
  stock: number;
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
  if (product.stock === 0) return 'Sold Out';
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

export function presentProductDetail(product: Product): ProductDetailViewModel {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    formattedPrice: formatPrice(product.price),
    imageUrl: product.imageUrl,
    images: product.images?.length ? product.images : [product.imageUrl],
    category: product.category,
    badge: resolveBadge(product),
    description: product.description,
    colors: product.colors ?? [],
    sizes: product.sizes ?? [],
    details: product.details ?? product.description,
    sizeChart: product.sizeChart ?? '',
    isSoldOut: product.stock === 0,
    stock: product.stock,
  };
}
