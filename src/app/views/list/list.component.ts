import { toSignal } from '@angular/core/rxjs-interop';

import { Component, inject, Signal } from '@angular/core';

import { ItemStore } from '@core/store/item.store';
import { Item } from '@core/interface/item.interface';

@Component({
  selector: 'rp-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
})
export class ListComponent {
  list: Signal<Item[] | undefined>;

  private itemStore = inject(ItemStore);

  constructor() {
    this.list = toSignal(this.itemStore.list$);
  }
}
