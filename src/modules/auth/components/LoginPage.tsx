'use client';

import { useState } from 'react';
import { useLogin } from '../hooks/use-login';

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M3.18 23.76c.37.21.8.22 1.2.04L15.55 12 4.38.2c-.4-.17-.83-.16-1.2.05-.74.42-.74 1.38-.73 1.38v20.77c-.01 0-.01.94.73 1.36zM19.37 9.67l-2.63-1.52L13.95 12l2.79 2.85 2.63-1.52c.76-.44 1.19-1.1 1.19-1.83s-.43-1.39-1.19-1.83zM5.1 1.2l9.51 9.72-2.66 2.66L5.1 1.2zM5.1 22.8l6.85-12.38 2.66 2.66L5.1 22.8z" />
    </svg>
  );
}

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { loginWithEmail, loginWithProvider, isPending, pendingProvider, error, reset } =
    useLogin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    reset();
    loginWithEmail({ email, password });
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-purple-100 opacity-50 blur-3xl" />
        <div className="absolute -right-16 top-20 h-[420px] w-[420px] rounded-full bg-rose-100 opacity-60 blur-3xl" />
        <div className="absolute bottom-24 right-10 h-64 w-64 rounded-full bg-orange-100 opacity-40 blur-2xl" />
      </div>

      {/* Main content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm rounded-2xl bg-white px-8 py-10 shadow-xl shadow-gray-200/60">
          {/* Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Login</h1>
            <p className="mt-1 text-sm font-medium text-orange-500">
              ลงชื่อเข้าใช้
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
              {error.message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => { reset(); setEmail(e.target.value); }}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => { reset(); setPassword(e.target.value); }}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-11 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-orange-500 hover:to-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending && !pendingProvider ? 'กำลังเข้าสู่ระบบ…' : 'Login'}
            </button>
          </form>

          {/* Or divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium text-gray-400">Or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social login */}
          <div className="space-y-3">
            <button
              type="button"
              disabled={isPending}
              onClick={() => { reset(); loginWithProvider('facebook'); }}
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#1877F2] py-3 text-sm font-semibold text-white transition hover:bg-[#1565d8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FacebookIcon />
              {pendingProvider === 'facebook'
                ? 'กำลังเข้าสู่ระบบ…'
                : 'Login with Facebook'}
            </button>

            <button
              type="button"
              disabled={isPending}
              onClick={() => { reset(); loginWithProvider('google'); }}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <GoogleIcon />
              {pendingProvider === 'google'
                ? 'กำลังเข้าสู่ระบบ…'
                : 'Login with Google'}
            </button>
          </div>

          {/* Register & Forgot */}
          <div className="mt-6 space-y-2 text-center">
            <p className="text-sm text-gray-500">
              Do you have an account?{' '}
              <span className="mx-1 text-gray-400">/</span>{' '}
              <a
                href="/register"
                className="font-semibold text-orange-500 hover:underline"
                suppressHydrationWarning
              >
                Register here
              </a>
            </p>
            <a
              href="/forgot-password"
              className="block text-xs text-orange-500 hover:underline"
              suppressHydrationWarning
            >
              Forgot password?
            </a>
          </div>
        </div>
      </main>

      {/* App download bar */}
      <div className="relative z-10 border-t border-gray-100 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          {/* Left: icon + text */}
          <div className="flex items-center gap-3">
            {/* App icon */}
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 text-lg font-black text-white shadow-sm">
              K
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">ดาวน์โหลดแอปฯ</p>
              <p className="text-xs text-gray-500">
                แอปพลิเคชัน KETCHUP ดาวน์โหลดทุกความต้องการ
              </p>
            </div>
          </div>

          {/* Right: store badges */}
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-white transition hover:bg-gray-700"
              suppressHydrationWarning
            >
              <GooglePlayIcon />
              <div className="text-left leading-tight">
                <p className="text-[8px] font-normal opacity-80">GET IT ON</p>
                <p className="text-[11px] font-semibold">Google Play</p>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-white transition hover:bg-gray-700"
              suppressHydrationWarning
            >
              <AppleIcon />
              <div className="text-left leading-tight">
                <p className="text-[8px] font-normal opacity-80">
                  Download on the
                </p>
                <p className="text-[11px] font-semibold">App Store</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
