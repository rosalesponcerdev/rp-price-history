import { inject, Injectable } from '@angular/core';

import { CreatePriceHistory, PriceHistory } from '@price-history/domain/model';
import { PriceHistoryPort } from '@price-history/domain/port';
import { Store } from '@shared/context/store/domain/model';
import { LocalStorageService } from '@shared/services';

@Injectable()
export class PriceHistoryLocalRepository implements PriceHistoryPort {
  private readonly _storageKey = 'PRICE_HISTORY';
  private readonly _storeStorageKey = 'STORE';

  private readonly _localStorageSrv = inject(LocalStorageService);

  public async create(
    createPriceHistory: CreatePriceHistory
  ): Promise<PriceHistory> {
    const storeList =
      this._localStorageSrv.getItem<Store[]>(this._storeStorageKey) ?? [];

    const store = storeList.find(s => s.id === createPriceHistory.store_id);

    const tempPriceHistory: PriceHistory = {
      id: crypto.randomUUID(),
      presentation_id: createPriceHistory.presentation_id,
      price: createPriceHistory.price,
      store_id: createPriceHistory.store_id,
      price_per_base_unit: createPriceHistory.price_per_base_unit,
      registration_date: new Date(Date.now()).toISOString(),
      store,
    };

    const priceHistoryList =
      this._localStorageSrv.getItem<PriceHistory[]>(this._storageKey) ?? [];

    this._localStorageSrv.setItem(this._storageKey, [
      tempPriceHistory,
      ...priceHistoryList,
    ]);

    return tempPriceHistory;
  }

  public async getByPresentation(
    presentationId: string
  ): Promise<PriceHistory[]> {
    const priceHistoryList =
      this._localStorageSrv.getItem<PriceHistory[]>(this._storageKey) ?? [];

    const foundedPriceHistory = priceHistoryList.filter(
      p => (p.presentation_id = presentationId)
    );

    return foundedPriceHistory;
  }
}
