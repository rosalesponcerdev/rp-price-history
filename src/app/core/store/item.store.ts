import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../interfaces/item.interface';

@Injectable({ providedIn: 'root' })
export class ItemStore {
  list$: Observable<Item[]>;
  currentItem$: Observable<Item | null>;

  private _list: BehaviorSubject<Item[]>;
  private _currentItem: BehaviorSubject<Item | null>;

  constructor() {
    this._list = new BehaviorSubject<Item[]>([
      {
        name: 'asd',
        price: 123,
        quantity: 123,
        unit: '123',
        id: '7f40cdb7-d11b-49ee-a2c0-8d92494f3c69',
      },
    ]);
    this.list$ = this._list.asObservable();

    this._currentItem = new BehaviorSubject<Item | null>(null);
    this.currentItem$ = this._currentItem.asObservable();
  }

  getList(): Item[] {
    return this._list.getValue();
  }
  setList(list: Item[]) {
    this._list.next(list);
  }

  addItem(item: Item | null) {
    if (!item) return;

    this._list.next([item, ...this.getList()]);
  }

  getCurrentItem(): Item | null {
    return this._currentItem.getValue();
  }
  setCurrentItem(item: Item | null) {
    this._currentItem.next(item);
  }
}
