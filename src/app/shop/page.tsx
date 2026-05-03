import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/category/1?page=1');
}
