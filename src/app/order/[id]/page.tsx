import { OrderSuccessPage } from '@/modules/order/components/OrderSuccessPage';

export const metadata = {
  title: 'สั่งซื้อสำเร็จ | NOVIEW',
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <OrderSuccessPage orderId={id} />;
}
