import type { OfficialGoodRepository } from '../repositories/official-good-repository';
import type { OfficialGood } from '../entities/official-good';

export class GetOfficialGoodByIdUseCase {
  constructor(private readonly repository: OfficialGoodRepository) {}

  async execute(id: string): Promise<OfficialGood> {
    const good = await this.repository.getOfficialGoodById(id);
    if (!good) {
      throw new Error('ไม่พบสินค้านี้');
    }
    return good;
  }
}
