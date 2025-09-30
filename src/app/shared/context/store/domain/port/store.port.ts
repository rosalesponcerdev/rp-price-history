import { Store } from '../model';

export interface StorePort {
  getAll(): Promise<Store[]>;
}
