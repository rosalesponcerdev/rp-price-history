import { Store } from '@shared/context/store/domain/model';
import { StoreDto } from '../dto';

export class StoreMapper {
  public static fromArray(storeDto: Partial<StoreDto>[]): Store[] {
    return storeDto.map(store => StoreMapper.from(store));
  }

  public static from(storeDto: Partial<StoreDto>): Store {
    return {
      id: `${storeDto.id}`,
      created_at: storeDto?.created_at ?? null,
      direction: storeDto?.direccion ?? null,
      name: storeDto?.nombre ?? '',
      phone: storeDto?.telefono ?? null,
      updated_at: storeDto?.updated_at ?? null,
    };
  }
}
