import { computed, Injectable, signal, Signal } from '@angular/core';

import { Store } from '@shared/context/store/domain/model';

@Injectable({ providedIn: 'root' })
export class StoreState {
  public stores$: Signal<Store[]>;
  public selected$: Signal<Store | undefined>;

  private readonly _stores = signal<Store[]>([]);
  private readonly _selected = signal<Store | undefined>(undefined);

  constructor() {
    this.stores$ = computed(() => structuredClone(this._stores()));
    this.selected$ = computed(() => structuredClone(this._selected()));
  }

  public get stores(): Store[] {
    return this._stores();
  }

  public set stores(stores: Store[] | undefined) {
    this._stores.set(structuredClone(stores ?? []));
  }

  public get selected(): Store | undefined {
    return this._selected();
  }

  public set selected(stores: Store | undefined) {
    this._selected.set(structuredClone(stores));
  }
}
