import type { Product } from '../entities/product';

export interface GetProductsParams {
  page?: number;
  limit?: number;
}

export interface GetProductsResult {
  products: Product[];
  total: number;
  page: number;
}

export interface ProductRepository {
  getProducts(params: GetProductsParams): Promise<GetProductsResult>;
}
