/**
 * Category registry — add new categories here.
 * Each category maps to one `dataSource` which determines
 * which repository/hook fetches its items.
 *
 * Supported dataSources:
 *   'products'       — MockProductRepository (TADA MERCH, etc.)
 *   'official-goods' — MockOfficialGoodRepository (NADAO goods, etc.)
 *
 * When a real API is available, add a new dataSource value and handle
 * it in useCategoryItems.ts.
 */

import { MOCK_ARTISTS } from './artists';

export type DataSource = 'products' | 'official-goods' | 'tada-artist' | 'bus-artist';

export interface CategoryConfig {
  id: string;
  /** Display title per language. Falls back to first key if lang not found. */
  title: Partial<Record<'TH' | 'EN', string>>;
  dataSource: DataSource;
  /** Optional: hero image shown at the top of the category page */
  bannerUrl?: string;
}

export const MOCK_CATEGORIES: CategoryConfig[] = [
  {
    id: '1',
    title: { TH: 'TADA MERCH', EN: 'TADA MERCH' },
    dataSource: 'products',
  },
  {
    id: '2',
    title: { TH: 'NADAO OFFICIAL GOODS', EN: 'NADAO OFFICIAL GOODS' },
    dataSource: 'official-goods',
  },
  // ── Add future categories below ────────────────────────────────────────────
  // {
  //   id: '3',
  //   title: { TH: 'BUS COLLECTION', EN: 'BUS COLLECTION' },
  //   dataSource: 'products',   // or a new dataSource type
  // },
];

/** Unified lookup — searches MOCK_CATEGORIES then MOCK_ARTISTS */
export function getCategoryById(id: string): CategoryConfig | undefined {
  return MOCK_CATEGORIES.find((c) => c.id === id) ?? MOCK_ARTISTS.find((a) => a.id === id);
}
