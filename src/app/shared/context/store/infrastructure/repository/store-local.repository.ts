import { inject, Injectable } from '@angular/core';

import { Store } from '@shared/context/store/domain/model';
import { StorePort } from '@shared/context/store/domain/port';
import { LocalStorageService } from '@shared/services';

@Injectable()
export class StoreLocalRepository implements StorePort {
  private readonly _storageKey = 'STORE';

  private readonly _localStorageSrv = inject(LocalStorageService);

  constructor() {
    this._populate();
  }

  public async getAll(): Promise<Store[]> {
    const storeList =
      this._localStorageSrv.getItem<Store[]>(this._storageKey) ?? [];

    return storeList;
  }

  private _populate() {
    const storeList = this._localStorageSrv.getItem(this._storageKey);

    if (storeList) return;

    this._localStorageSrv.setItem(this._storageKey, [
      {
        name: 'Wong',
        direction: 'Av. Principal 123',
        id: crypto.randomUUID(),
        created_at: new Date(Date.now()).toISOString(),
        updated_at: new Date(Date.now()).toISOString(),
        phone: '',
      },
      {
        name: 'Plaza Vea',
        direction: 'Cc. Jockey Plaza',
        id: crypto.randomUUID(),
        created_at: new Date(Date.now()).toISOString(),
        updated_at: new Date(Date.now()).toISOString(),
        phone: '',
      },
      {
        name: 'Tottus',
        direction: 'Av. Universitaria 456',
        id: crypto.randomUUID(),
        created_at: new Date(Date.now()).toISOString(),
        updated_at: new Date(Date.now()).toISOString(),
        phone: '',
      },
    ]);
  }
}
