import { Store } from '../model';
import { StorePort } from '../port';

export class GetStoresUseCase {
  public constructor(private readonly _storePort: StorePort) {}

  async execute(): Promise<Store[]> {
    return this._storePort.getAll();
  }
}
