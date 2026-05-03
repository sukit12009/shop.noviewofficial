import type { CategoryConfig } from './categories';

/**
 * Artist registry — each artist maps to a dataSource for their product listings.
 * Route: /artist/[id]  →  CategoryPage with categoryId = `artist-${id}`
 *
 * Adding a new artist here automatically makes it appear in the ARTIST dropdown.
 */
export const MOCK_ARTISTS: CategoryConfig[] = [
  {
    id: 'artist-1',
    title: { TH: 'TADA', EN: 'TADA' },
    dataSource: 'tada-artist',
  },
  {
    id: 'artist-2',
    title: { TH: 'BUS', EN: 'BUS' },
    dataSource: 'bus-artist',
  },
];

/** Quick lookup by raw artist id (e.g. '1') or full prefixed id (e.g. 'artist-1') */
export function getArtistById(id: string): CategoryConfig | undefined {
  const prefixed = id.startsWith('artist-') ? id : `artist-${id}`;
  return MOCK_ARTISTS.find((a) => a.id === prefixed);
}
