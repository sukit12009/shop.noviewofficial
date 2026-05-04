# Noview Shop — Project Context

> อัปเดตล่าสุด: 2026-05-05 (cart page + order success page)
>
> ไฟล์นี้สรุป context ทั้งหมดของโปรเจค ให้อ่านก่อนเริ่มทำงานทุกครั้ง

---

## Overview

**Noview Shop** คือ e-commerce storefront สำหรับ NADAO Official ที่ขาย merchandise และ official goods ของศิลปิน (เช่น TADA, BUS) ปัจจุบันอยู่ในช่วง development โดยใช้ mock data แทน real API

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 |
| Data Fetching | TanStack Query v5 (React Query) |
| State Management | Zustand v5 (cart) |
| Font | Inter (Google Fonts) |

---

## Architecture

โปรเจคใช้ **Clean Architecture** ที่กำหนดไว้ใน `.cursor/rules/clean-architecture.mdc`

### Layer Flow (บังคับ)

```
UI (components) → hooks → use-cases → repository interface → repository impl → API
```

### Layer Rules

- **UI (`modules/*/components`)** — pure components รับ data ผ่าน props เท่านั้น ห้าม fetch, ห้าม business logic
- **Hooks (`modules/*/hooks`)** — orchestrate logic ผ่าน use-cases + React Query
- **Use-cases (`core/use-cases`)** — business logic순수 ไม่มี React/Next.js
- **Repository interface (`core/repositories`)** — abstract contract
- **Repository impl (`infrastructure/repositories`)** — map API response → domain entity
- **API Client (`infrastructure/api/api-client.ts`)** — base URL จาก `NEXT_PUBLIC_API_URL` (default: `http://localhost:8080/api/v1`)

---

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — Inter font, Providers wrapper
│   ├── page.tsx            # Home page (client component)
│   └── globals.css
│
├── core/
│   ├── entities/
│   │   ├── banner.ts       # Banner { id, title, subtitle, imageUrl, linkUrl }
│   │   ├── product.ts      # Product { id, name, description, price, imageUrl, images?, stock, category, isNew, colors?, sizes?, details?, sizeChart? }
│   │   ├── official-good.ts # OfficialGood { id, name, price, imageUrl, isSoldOut, images?, colors?, sizes?, details?, sizeChart? }
│   │   ├── user.ts         # User { id, name, email, avatarUrl? }
│   │   └── order.ts        # Order { id, createdAt, items, subtotal, discount, shippingFee, total, shippingAddress, status }
│   ├── repositories/
│   │   ├── banner-repository.ts
│   │   ├── product-repository.ts  # getProducts + getProductById
│   │   ├── official-good-repository.ts
│   │   └── auth-repository.ts     # loginWithEmail, loginWithProvider, logout
│   └── use-cases/
│       ├── get-banners.ts
│       ├── get-products.ts
│       ├── get-official-goods.ts
│       ├── get-product-by-id.ts
│       ├── get-official-good-by-id.ts
│       ├── get-catalog-item.ts        # ลองหา product ก่อน fallback ไป official-good (ใช้กับ /products/[id])
│       ├── login-with-email.ts
│       └── login-with-provider.ts
│
├── infrastructure/
│   ├── api/
│   │   └── api-client.ts   # apiFetch wrapper, ApiResponse<T> type
│   └── repositories/
│       ├── mock-banner-repository.ts          # 3 mock banners (Unsplash images)
│       ├── mock-product-repository.ts         # 8 mock products (NADAO merchandise) with gallery images, colors, sizes, details
│       ├── mock-official-good-repository.ts   # 8 mock official goods
│       ├── mock-auth-repository.ts            # mock users: test@example.com/password123, admin@noview.co/admin1234 + social mock
│       └── product-repository-impl.ts         # Real API impl (GET /products, GET /products/:id)
│
├── modules/
│   ├── home/
│   │   ├── components/
│   │   │   ├── Header.tsx           # Sticky header: logo, nav (SHOP/ARTIST/NEWS), search, cart badge, language switcher (TH/EN), mobile hamburger, LOGIN link / user avatar + LOGOUT
│   │   │   ├── HeroBanner.tsx       # Full-height slider (auto-rotate 5s), dot indicators, arrow nav
│   │   │   ├── ProductSection.tsx   # "TADA MERCH" grid section (uses HomeProductCard)
│   │   │   ├── HomeProductCard.tsx  # Product card with hover zoom, badge
│   │   │   ├── OfficialGoodsSection.tsx # "NADAO OFFICIAL GOODS" grid section
│   │   │   └── ProductCardV2.tsx    # Official goods card: favorite heart toggle, sold-out overlay
│   │   ├── hooks/
│   │   │   ├── use-banner-list.ts   # React Query ['banners']
│   │   │   └── use-official-goods.ts # React Query ['official-goods'] + local favorites state
│   │   └── presenters/
│   │       ├── banner-presenter.ts        # → BannerViewModel
│   │       └── official-good-presenter.ts # → OfficialGoodViewModel (formatPrice THB)
│   │
│   ├── auth/
│   │   ├── components/
│   │   │   └── LoginPage.tsx  # Full login page: email/password form, Facebook/Google social login, blobs bg, app download bar
│   │   └── hooks/
│   │       └── use-login.ts   # useMutation for loginWithEmail + loginWithProvider, sets auth-store on success, redirect to /
│   │
│   ├── product/
│   │   ├── components/
│   │   │   ├── ProductCard.tsx      # General product card
│   │   │   ├── ProductList.tsx      # Grid list wrapper
│   │   │   ├── ProductImageGallery.tsx # Main image + thumbnails + lightbox
│   │   │   ├── ProductInfo.tsx      # Right panel: color/size selector, quantity stepper, add to cart
│   │   │   ├── ProductTabs.tsx      # รายละเอียด / ตารางขนาด tabs
│   │   │   ├── RelatedProducts.tsx  # "คุณอาจจะชอบสิ่งนี้" section
│   │   │   └── ProductDetailPage.tsx # Full detail page composition
│   │   ├── hooks/
│   │   │   ├── use-product-list.ts  # React Query ['products', { page, limit }]
│   │   │   └── use-product-detail.ts # React Query ['product', id] — ใช้ GetCatalogItemUseCase (รองรับทั้ง product และ official-good IDs)
│   │   └── presenters/
│   │       └── product-presenter.ts  # ProductViewModel + ProductDetailViewModel
│   │
│   ├── cart/
│   │   └── components/
│   │       └── CartPage.tsx  # Cart review: item list, quantity controls, subtotal summary, proceed to checkout
│   ├── order/
│   │   └── components/
│   │       └── OrderSuccessPage.tsx  # Order confirmation: success hero, order card (items/pricing/address), not-found state
│   └── layout/
│       └── components/
│           └── Footer.tsx  # Logo "ketchup", Terms/Contact links, social icons (Twitter/FB/IG), copyright 2023
│
├── shared/
│   ├── hooks/
│   │   └── use-cart.ts    # SSR-safe cart item count hook (mounted guard)
│   └── store/
│       ├── cart-store.ts  # Zustand persist store → localStorage 'cart-storage'
│       ├── auth-store.ts  # Zustand persist store → localStorage 'auth-storage' — user: User | null, setUser, logout
│       └── order-store.ts # Zustand persist store → localStorage 'order-storage' — orders: Order[], addOrder
│
└── lib/
    ├── providers.tsx       # QueryClientProvider + ReactQueryDevtools
    └── query-client.ts     # QueryClient singleton (browser) / new instance (server)
```

---

## Home Page (`/`)

`src/app/page.tsx` เป็น client component ที่ compose ทุก section:

```
Header (cartCount)
HeroBanner (banners, isLoading)
ProductSection "TADA MERCH" (products[0–7])
OfficialGoodsSection "NADAO OFFICIAL GOODS" (goods, favorites, toggleFavorite)
Footer
```

---

## API Contract

Base URL: `NEXT_PUBLIC_API_URL` (default `http://localhost:8080/api/v1`)

Response envelope:
```ts
interface ApiResponse<T> {
  data: T;
  error: { code: string; message: string } | null;
  meta: { page: number; total: number };
}
```

Implemented endpoint:
- `GET /products?page=&limit=` → `ProductApiItem[]`

Banners และ OfficialGoods ยังใช้ mock repository อยู่ ยังไม่มี real endpoint

---

## Current State & Known Gaps

| รายการ | สถานะ |
|---|---|
| Home page UI | ✅ สร้างแล้ว |
| Header (nav, cart badge, lang switcher, mobile menu) | ✅ สร้างแล้ว |
| Hero banner slider | ✅ สร้างแล้ว |
| Product section (TADA MERCH) | ✅ สร้างแล้ว |
| Official Goods section | ✅ สร้างแล้ว |
| Cart store (Zustand) + add/remove/updateQuantity/clearCart | ✅ implement แล้ว |
| Product detail page (`/products/[id]`) | ✅ สร้างแล้ว |
| NADAO Official Goods detail page | ✅ ใช้ `/products/[id]` route เดียวกัน (via GetCatalogItemUseCase) |
| `/shop` page | ✅ redirect → `/category/1` |
| Category listing page (`/category/[id]`) | ✅ สร้างแล้ว (sort, pagination, wishlist, add-to-cart) |
| Checkout page (`/checkout`) | ✅ สร้างแล้ว (ShippingSection, CartItemRow, OrderSummary, coupon) |
| Authentication/Login | ✅ Login page + mock auth สร้างแล้ว |
| Profile page (`/profile`) | ✅ สร้างแล้ว (info, wishlist tab, address modal) |
| Wishlist system | ✅ wishlist-store + useWishlist + useWishlistItems |
| i18n (TH/EN) | ✅ translations.ts ครอบคลุมทุก section |
| Dynamic categories (`/category/[id]`) | ✅ MOCK_CATEGORIES config + useCategoryItems |
| Real API integration (banners, goods) | ❌ ยังใช้ mock repository |
| Cart variant tracking (color/size) | ✅ CartItem มี color/size + variantKey เป็น unique key ต่อ cart line |
| Payment gateway | ✅ handleConfirm save order → localStorage แล้ว clear cart + redirect /profile?tab=history |
| Order entity + history | ✅ Order entity + order-store (Zustand persist) — profile history tab แสดง order list |
| Search functionality | ✅ `/search?q=` — ค้นหาชื่อสินค้าจากทั้ง products + official-goods |
| ARTIST pages | ✅ `/artist/[id]` — reuse CategoryPage, dropdown ใน Header |
| NEWS pages | ✅ `/news` (listing) + `/news/[id]` (detail) — 8 mock articles, 4 categories |
| Cart page (`/cart`) | ✅ item list, quantity/remove, subtotal summary, proceed to checkout |
| Order success page (`/order/[id]`) | ✅ success hero, order detail card (items/pricing/address), not-found state |

---

## React Query Keys

| Key | Data |
|---|---|
| `['banners']` | HeroBanner slides |
| `['official-goods']` | Official goods grid |
| `['products', { page, limit }]` | Product listing |

Default: `staleTime: 5 min`, `retry: 1`, `refetchOnWindowFocus: false`

---

## Cart Store

- Library: Zustand v5 + `devtools` + `persist`
- localStorage key: `cart-storage`
- State: `items: CartItem[]` (productId, name, price, imageUrl, quantity)
- Actions: **ยังไม่ implement** — ต้องเพิ่ม addItem, removeItem, updateQuantity, clearCart

---

## Previous Work Sessions

- [Initial project setup & architecture](59bbc82e-c20d-4ef0-a73a-48a6e73c553b) — ตั้งค่า Next.js, clean architecture, สร้าง entities/use-cases/repositories/components ทั้งหมดของ home page
- [Context documentation](1ad0a47a-f3aa-4fc3-beb1-2288e79c780e) — สร้างไฟล์ context.md + update-context rule
- [Login system](1ad0a47a-f3aa-4fc3-beb1-2288e79c780e) — สร้างระบบ login: User entity, AuthRepository, LoginUseCases, MockAuthRepository, auth-store (Zustand), useLogin hook, LoginPage component (/login route), เพิ่ม LOGOUT ใน Header
