'use client';

import Image from 'next/image';
import { useOfficialGoods } from '../../home/hooks/use-official-goods';

interface RelatedOfficialGoodsProps {
  currentId: string;
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="aspect-square animate-pulse rounded-xl bg-gray-200" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-3/4 animate-pulse rounded-full bg-gray-200" />
        <div className="h-3 w-1/3 animate-pulse rounded-full bg-gray-200" />
      </div>
    </div>
  );
}

export function RelatedOfficialGoods({ currentId }: RelatedOfficialGoodsProps) {
  const { goods, isLoading } = useOfficialGoods();
  const related = goods.filter((g) => g.id !== currentId).slice(0, 4);

  return (
    <section className="mt-16 border-t border-gray-100 pt-16">
      <h2 className="mb-2 text-center text-2xl font-bold tracking-wide text-gray-900">
        คุณอาจจะชอบสิ่งนี้
      </h2>
      <div className="mx-auto mb-10 h-0.5 w-10 bg-gray-300" />

      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
          : related.map((good) => (
              <a
                key={good.id}
                href={`/official-goods/${good.id}`}
                className="group block rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                suppressHydrationWarning
              >
                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                  <Image
                    src={good.imageUrl}
                    alt={good.name}
                    fill
                    className={`object-contain p-6 transition-transform duration-500 group-hover:scale-105 ${
                      good.isSoldOut ? 'opacity-40' : ''
                    }`}
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  {good.isSoldOut && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl">
                      <span className="rounded-full border border-gray-400 bg-white/90 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-gray-500">
                        SOLD OUT
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-3 space-y-1">
                  <h3 className="line-clamp-2 text-sm font-medium text-gray-800">
                    {good.name}
                  </h3>
                  <p className={`text-sm font-bold ${good.isSoldOut ? 'text-gray-400' : 'text-gray-900'}`}>
                    {good.formattedPrice}
                  </p>
                </div>
              </a>
            ))}
      </div>
    </section>
  );
}
