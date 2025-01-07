import { inject, Injectable } from '@angular/core';
import { Item } from '../interfaces/item.interface';
import { delay, Observable, of, tap, throwError } from 'rxjs';
import { ItemStore } from '../store/item.store';

const STORAGE_KEY = 'ITEMS';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private _itemStore = inject(ItemStore);

  save(item: Item): Observable<Item> {
    return this.setItemToStorage(item).pipe(
      tap(data => {
        this._itemStore.addItem(data);
      })
    );
  }

  // list(): Item[] {}
  // update(item: Partial<Item>): Item {}
  delete(id: string): Observable<Item> {
    return this.removeItemFromStore(id).pipe(
      tap(data => {
        console.log(data);

        this._itemStore.deleteItem(data.id);
      })
    );
  }

  // TODO: BACKEND
  private getItemsFromStorage(): Item[] {
    const data = localStorage.getItem(STORAGE_KEY);

    try {
      return JSON.parse(data ?? '') ?? [];
    } catch (error) {
      console.warn(error);

      return [];
    }
  }

  private setItemToStorage(item: Item): Observable<Item> {
    const newItem = { ...item, id: crypto.randomUUID() };
    const list = this.getItemsFromStorage();

    const newList = [newItem, ...list];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));

    return of(newItem).pipe(delay(2000));
  }

  private removeItemFromStore(id: string | undefined = ''): Observable<Item> {
    if (!id)
      return throwError(() => {
        return new Error('Id not provided');
      });

    const list = this.getItemsFromStorage();

    const index = list.findIndex(item => item.id === id);

    if (index === -1)
      return throwError(() => {
        return 'Not index';
      });

    const [deletedItem] = list.splice(index, 1);

    return of(deletedItem).pipe(delay(2000));
  }
}
