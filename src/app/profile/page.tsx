import { Suspense } from 'react';
import { ProfilePage } from '@/modules/profile/components/ProfilePage';

export const metadata = {
  title: 'Profile | NOVIEW',
};

export default function Page() {
  return (
    <Suspense>
      <ProfilePage />
    </Suspense>
  );
}
