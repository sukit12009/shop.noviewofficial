import type { ProductRepository } from '../repositories/product-repository';
import type { OfficialGoodRepository } from '../repositories/official-good-repository';
import type { Product } from '../entities/product';
import type { OfficialGood } from '../entities/official-good';

export type CatalogItemResult =
  | { kind: 'product'; data: Product }
  | { kind: 'official-good'; data: OfficialGood };

export class GetCatalogItemUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly officialGoodRepository: OfficialGoodRepository,
  ) {}

  async execute(id: string): Promise<CatalogItemResult> {
    const product = await this.productRepository.getProductById(id);
    if (product) return { kind: 'product', data: product };

    const good = await this.officialGoodRepository.getOfficialGoodById(id);
    if (good) return { kind: 'official-good', data: good };

    throw new Error('ไม่พบสินค้านี้');
  }
}
