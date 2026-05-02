import { ProductDetailPage } from '@/modules/product/components/ProductDetailPage';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductDetailPage id={id} />;
}
