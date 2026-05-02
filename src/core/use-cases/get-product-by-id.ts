import type { ProductRepository } from '../repositories/product-repository';
import type { Product } from '../entities/product';

export class GetProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.getProductById(id);
    if (!product) {
      throw new Error('ไม่พบสินค้านี้');
    }
    return product;
  }
}
