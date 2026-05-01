import { ProductCard } from './ProductCard';
import type { ProductViewModel } from '../presenters/product-presenter';

interface ProductListProps {
  products: ProductViewModel[];
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-medium text-gray-500">No products found</p>
        <p className="mt-1 text-sm text-gray-400">
          Check back later for new arrivals.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
