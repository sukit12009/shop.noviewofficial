import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      {/* Big number */}
      <p className="text-[10rem] font-black leading-none tracking-tighter text-gray-100 select-none">
        404
      </p>

      {/* Icon */}
      <div className="-mt-8 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
        <svg
          className="h-8 w-8 text-orange-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-black text-gray-900">ไม่พบหน้าที่คุณต้องการ</h1>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        หน้านี้อาจถูกย้าย ลบ หรือไม่เคยมีอยู่ในระบบ
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-xl bg-orange-500 px-8 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
        >
          กลับหน้าแรก
        </Link>
        <Link
          href="/search"
          className="rounded-xl border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          ค้นหาสินค้า
        </Link>
      </div>
    </div>
  );
}
