import type {
  ProductRepository,
  GetProductsParams,
  GetProductsResult,
} from '../repositories/product-repository';

/**
 * Business rules applied here:
 * - Only in-stock products are surfaced to the UI.
 */
export class GetProductsUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(params: GetProductsParams): Promise<GetProductsResult> {
    const result = await this.repository.getProducts(params);

    const inStock = result.products.filter((p) => p.stock > 0);

    return {
      ...result,
      products: inStock,
    };
  }
}
