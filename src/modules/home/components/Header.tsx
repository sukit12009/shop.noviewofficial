'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../../../shared/store/auth-store';
import { useCart } from '../../../shared/hooks/use-cart';
import { useLangStore } from '../../../shared/store/lang-store';
import { useT } from '../../../shared/hooks/use-t';

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function Header() {
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const { itemCount: cartCount } = useCart();
  const lang = useLangStore((s) => s.lang);
  const setLang = useLangStore((s) => s.setLang);
  const t = useT();

  const NAV_LINKS = [
    { key: 'shop', label: t.nav.shop },
    { key: 'artist', label: t.nav.artist },
    { key: 'news', label: t.nav.news },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="text-xl font-black tracking-[0.25em] text-gray-900">
            NOVIEW
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ key, label }) => (
            <a
              key={key}
              href="#"
              className="text-sm font-semibold tracking-widest text-gray-600 transition-colors hover:text-black"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button
            type="button"
            aria-label={t.nav.searchAriaLabel}
            className="p-1.5 text-gray-600 transition-colors hover:text-black"
          >
            <SearchIcon />
          </button>

          {/* User */}
          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                {user.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-bold text-gray-600">
                    {user.name[0].toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user.name}
              </span>
              <button
                type="button"
                onClick={logout}
                className="text-xs font-semibold tracking-widest text-gray-400 transition-colors hover:text-black"
              >
                {t.nav.logout}
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden text-sm font-semibold tracking-widest text-gray-600 transition-colors hover:text-black md:block"
            >
              {t.nav.login}
            </Link>
          )}

          {/* Cart */}
          <Link
            href="/checkout"
            aria-label={t.nav.cartAriaLabel}
            className="relative p-1.5 text-gray-600 transition-colors hover:text-black"
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1 text-sm font-semibold tracking-widest text-gray-600 transition-colors hover:text-black"
            >
              {lang}
              <ChevronDownIcon />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-20 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg">
                {(['TH', 'EN'] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => {
                      setLang(l);
                      setLangOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                      lang === l
                        ? 'font-bold text-black'
                        : 'font-medium text-gray-500'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            className="p-1.5 text-gray-600 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          {NAV_LINKS.map(({ key, label }) => (
            <a
              key={key}
              href="#"
              className="block px-6 py-4 text-sm font-semibold tracking-widest text-gray-700 transition-colors hover:bg-gray-50"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
