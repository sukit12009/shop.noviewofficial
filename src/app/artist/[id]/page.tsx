import { CategoryPage } from '@/modules/category/components/CategoryPage';
import { getArtistById } from '@/shared/config/artists';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const artist = getArtistById(id);
  const name = artist?.title.EN ?? artist?.title.TH ?? 'Artist';
  return { title: `${name} | NOVIEW` };
}

export default async function Page({ params, searchParams }: Props) {
  const { id } = await params;
  const { page } = await searchParams;
  const initialPage = Math.max(1, Number(page) || 1);

  return <CategoryPage categoryId={`artist-${id}`} initialPage={initialPage} />;
}
