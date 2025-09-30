import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

import { Brand } from '@main-view/domain/model/brand.model';

@Injectable({ providedIn: 'root' })
export class BrandState {
  public readonly state$: Signal<Brand[]>;
  public readonly currentBrand$: Signal<Brand | undefined>;

  private readonly _state: WritableSignal<Brand[]>;
  private readonly _currentBrand: WritableSignal<Brand | undefined>;

  public constructor() {
    this._state = signal<Brand[]>([]);
    this.state$ = computed(() => this._state());

    this._currentBrand = signal<Brand | undefined>(undefined);
    this.currentBrand$ = computed(() => this._currentBrand());
  }

  set brands(categories: Brand[]) {
    this._state.set(structuredClone(categories));
  }

  get brands() {
    return this._state();
  }

  set currentBrand(brand: Brand | undefined) {
    const newBrand = brand ? structuredClone(brand) : undefined;
    this._currentBrand.set(newBrand);
  }

  get currentBrand(): Brand | undefined {
    return this._currentBrand();
  }

  findById(brandId: string) {
    return this.brands.find(({ id }) => id === brandId);
  }
}
