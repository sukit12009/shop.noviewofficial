import { Suspense } from 'react';
import { SearchPage } from '@/modules/search/components/SearchPage';

export const metadata = {
  title: 'ค้นหาสินค้า | NOVIEW',
};

export default function Page() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
