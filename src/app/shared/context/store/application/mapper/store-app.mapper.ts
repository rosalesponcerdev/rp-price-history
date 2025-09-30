import { Store } from '@shared/context/store/domain/model';
import { Item } from '@shared/interface';

export class StoreAppMapper {
  static toItem(stores: Store[]): Item[] {
    return stores.map(s => ({
      id: s.id,
      text: s.name,
    }));
  }
}
