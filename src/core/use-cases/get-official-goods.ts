import type { OfficialGoodRepository } from '../repositories/official-good-repository';
import type { OfficialGood } from '../entities/official-good';

export class GetOfficialGoodsUseCase {
  constructor(private readonly repository: OfficialGoodRepository) {}

  async execute(): Promise<OfficialGood[]> {
    return this.repository.getOfficialGoods();
  }
}
