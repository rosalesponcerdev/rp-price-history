import { inject, Injectable } from '@angular/core';

import { Store } from '../domain/model';
import { StoreState } from './state';
import { GetStoresHttpApplicationUseCase } from './use-case';
import { Loading } from '@shared/class';

@Injectable()
export class StoreService extends Loading<{
  getAll: boolean;
}> {
  private readonly _getStoreHttpUseCase = inject(
    GetStoresHttpApplicationUseCase
  );

  private readonly storeState = inject(StoreState);

  public constructor() {
    super({
      getAll: false,
    });
  }

  async getAll(): Promise<Store[]> {
    try {
      this._setLoading('getAll', true);

      let stores = this.storeState.stores;

      if (!stores.length) {
        stores = await this._getStoreHttpUseCase.execute();

        this.storeState.stores = stores;
      }

      this._setLoading('getAll', false);

      return stores;
    } catch (error) {
      console.warn(error);

      throw error;
    }
  }
}
