export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  images?: string[];
  stock: number;
  category: string;
  isNew: boolean;
  colors?: { label: string; value: string }[];
  sizes?: string[];
  details?: string;
  sizeChart?: string;
}
