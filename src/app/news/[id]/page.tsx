import { NewsDetailPage } from '@/modules/news/components/NewsDetailPage';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: `ข่าวสาร #${id} | NOVIEW` };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <NewsDetailPage id={id} />;
}
