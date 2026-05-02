import { ProductCardV2 } from './ProductCardV2';
import type { OfficialGoodViewModel } from '../presenters/official-good-presenter';

interface OfficialGoodsSectionProps {
  goods: OfficialGoodViewModel[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  isLoading: boolean;
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="aspect-square animate-pulse rounded-xl bg-gray-200" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full animate-pulse rounded-full bg-gray-200" />
        <div className="h-3 w-2/3 animate-pulse rounded-full bg-gray-200" />
        <div className="h-3 w-1/3 animate-pulse rounded-full bg-gray-200" />
      </div>
    </div>
  );
}

export function OfficialGoodsSection({
  goods,
  favorites,
  onToggleFavorite,
  isLoading,
}: OfficialGoodsSectionProps) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold tracking-[0.4em] text-gray-400 uppercase">
            Official Store
          </p>
          <h2 className="text-3xl font-black tracking-[0.2em] text-gray-900 uppercase md:text-4xl">
            NADAO OFFICIAL GOODS
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-12 bg-black" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
            : goods.map((good) => (
                <ProductCardV2
                  key={good.id}
                  product={good}
                  isFavorited={favorites.has(good.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
        </div>

        {/* View All */}
        {!isLoading && (
          <div className="mt-14 text-center">
            <a
              href="/official-goods"
              className="inline-block rounded-full border-2 border-black px-12 py-3 text-sm font-bold tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white"
              suppressHydrationWarning
            >
              VIEW ALL
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
