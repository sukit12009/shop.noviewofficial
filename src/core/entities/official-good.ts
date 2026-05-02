export interface OfficialGood {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  isSoldOut: boolean;
  images?: string[];
  colors?: { label: string; value: string }[];
  sizes?: string[];
  details?: string;
  sizeChart?: string;
}
