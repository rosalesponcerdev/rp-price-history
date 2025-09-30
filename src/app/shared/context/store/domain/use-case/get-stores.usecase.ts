import { Store } from '../model';
import { StorePort } from '../port';

export class GetStoresUseCase {
  constructor(private readonly _storePort: StorePort) {}

  public async execute(): Promise<Store[]> {
    return this._storePort.getAll();
  }
}
