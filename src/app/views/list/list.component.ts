import { toSignal } from '@angular/core/rxjs-interop';

import { Component, inject, Signal } from '@angular/core';

import { ItemStore } from '@core/store/item.store';
import { Item } from '@core/interfaces/item.interface';
import { ItemService } from '../../core/service/item.service';

@Component({
  selector: 'rp-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
})
export class ListComponent {
  list: Signal<Item[] | undefined>;

  private _itemStore = inject(ItemStore);
  private _itemSrv = inject(ItemService);

  constructor() {
    this.list = toSignal(this._itemStore.list$);
  }

  editHandler(item: Item) {
    console.log(item);
  }

  removeHandler(item: Item) {
    if (!item.id) return;

    this._itemSrv.delete(item.id).subscribe({
      next: value => {
        console.info(value);
      },
      error: error => {
        console.warn(error);
      },
    });
  }
}
