import {
  computed,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';

import { PriceHistory } from '@price-history/domain/model';

@Injectable({ providedIn: 'root' })
export class PriceHistoryState {
  public readonly list$: Signal<PriceHistory[]>;

  private readonly _list: WritableSignal<PriceHistory[]>;

  constructor() {
    this._list = signal<PriceHistory[]>([]);

    this.list$ = computed(() => structuredClone(this._list()));
  }

  public get list() {
    return this.list$();
  }

  public set list(prices: PriceHistory[] | undefined) {
    this._list.set(structuredClone(prices || []));
  }
}
