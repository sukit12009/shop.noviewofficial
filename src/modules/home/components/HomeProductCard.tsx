import Image from 'next/image';
import type { ProductViewModel } from '../../product/presenters/product-presenter';

interface HomeProductCardProps {
  product: ProductViewModel;
}

export function HomeProductCard({ product }: HomeProductCardProps) {
  return (
    <div className="group cursor-pointer">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={product.imageUrl || '/placeholder.png'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-[11px] font-bold tracking-widest text-white">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 space-y-0.5 px-0.5">
        <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400">
          {product.category}
        </p>
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
          {product.name}
        </h3>
        <p className="text-sm font-bold text-gray-900">{product.formattedPrice}</p>
      </div>
    </div>
  );
}
