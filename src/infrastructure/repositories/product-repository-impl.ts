import { apiClient } from '../api/api-client';
import type {
  ProductRepository,
  GetProductsParams,
  GetProductsResult,
} from '../../core/repositories/product-repository';
import type { Product } from '../../core/entities/product';

/** Raw shape returned by the API — intentionally kept private to this file. */
interface ProductApiItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  category: string;
  is_new: boolean;
}

function toProduct(item: ProductApiItem): Product {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    imageUrl: item.image_url,
    stock: item.stock,
    category: item.category,
    isNew: item.is_new ?? false,
  };
}

export class ProductRepositoryImpl implements ProductRepository {
  async getProducts(params: GetProductsParams): Promise<GetProductsResult> {
    const { page = 1, limit = 20 } = params;
    const qs = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    const response = await apiClient.get<ProductApiItem[]>(`/products?${qs}`);

    return {
      products: response.data.map(toProduct),
      total: response.meta.total,
      page: response.meta.page,
    };
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await apiClient.get<ProductApiItem>(`/products/${id}`);
      return toProduct(response.data);
    } catch {
      return null;
    }
  }
}
