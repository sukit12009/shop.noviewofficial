import type { OfficialGood } from '../entities/official-good';

export interface OfficialGoodRepository {
  getOfficialGoods(): Promise<OfficialGood[]>;
}
