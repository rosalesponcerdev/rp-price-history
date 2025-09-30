import { computed, Injectable, signal, Signal } from '@angular/core';

import { Store } from '@shared/context/store/domain/model';

@Injectable({ providedIn: 'root' })
export class StoreState {
  public stores$: Signal<Store[]>;
  public selected$: Signal<Store | undefined>;

  private _stores = signal<Store[]>([]);
  private _selected = signal<Store | undefined>(undefined);

  public constructor() {
    this.stores$ = computed(() => structuredClone(this._stores()));
    this.selected$ = computed(() => structuredClone(this._selected()));
  }

  get stores(): Store[] {
    return this._stores();
  }

  set stores(stores: Store[] | undefined) {
    this._stores.set(structuredClone(stores ?? []));
  }

  get selected(): Store | undefined {
    return this._selected();
  }

  set selected(stores: Store | undefined) {
    this._selected.set(structuredClone(stores));
  }
}
