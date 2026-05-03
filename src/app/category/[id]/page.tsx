import { CategoryPage } from '@/modules/category/components/CategoryPage';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const titles: Record<string, string> = {
    '1': 'TADA MERCH',
    '2': 'NADAO OFFICIAL GOODS',
  };
  return { title: `${titles[id] ?? 'Shop'} | NOVIEW` };
}

export default async function Page({ params, searchParams }: Props) {
  const { id } = await params;
  const { page } = await searchParams;
  const initialPage = Math.max(1, Number(page) || 1);

  return <CategoryPage categoryId={id} initialPage={initialPage} />;
}
