import Image from 'next/image';
import type { OfficialGoodViewModel } from '../presenters/official-good-presenter';

interface ProductCardV2Props {
  product: OfficialGoodViewModel;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function ProductCardV2({
  product,
  isFavorited,
  onToggleFavorite,
}: ProductCardV2Props) {
  return (
    <div className="group relative flex flex-col rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Favorite button — sits above the link */}
      <button
        type="button"
        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        onClick={() => onToggleFavorite(product.id)}
        className={`absolute right-4 top-4 z-10 transition-colors ${
          isFavorited ? 'text-rose-500' : 'text-gray-300 hover:text-rose-400'
        }`}
      >
        <HeartIcon filled={isFavorited} />
      </button>

      {/* Clickable link area */}
      <a
        href={`/products/${product.id}`}
        className="flex flex-col p-4"
        suppressHydrationWarning
      >
        {/* Image Area */}
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-6">
          <Image
            src={product.imageUrl || '/placeholder.png'}
            alt={product.name}
            fill
            className={`object-contain p-6 transition-transform duration-500 group-hover:scale-105 ${
              product.isSoldOut ? 'opacity-40' : ''
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />

          {/* Sold Out Overlay */}
          {product.isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl">
              <span className="rounded-full border border-gray-400 bg-white/90 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-gray-500">
                SOLD OUT
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-4 space-y-1">
          <h3
            title={product.name}
            className="line-clamp-2 text-sm font-medium leading-snug text-gray-800"
          >
            {product.name}
          </h3>
          <p
            className={`text-sm font-bold ${
              product.isSoldOut ? 'text-gray-400' : 'text-gray-900'
            }`}
          >
            {product.formattedPrice}
          </p>
        </div>
      </a>
    </div>
  );
}
