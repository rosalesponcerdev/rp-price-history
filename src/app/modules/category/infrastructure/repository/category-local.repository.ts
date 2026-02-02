import { inject, Injectable } from '@angular/core';

import { Category } from '@category/domain/model';
import { CategoryRepositoryPort } from '@category/domain/port';
import { LocalStorageService } from '@shared/services';

@Injectable()
export class CategoryLocalRepository implements CategoryRepositoryPort {
  private readonly _storageKey = 'CATEGORY';
  private readonly _localStorageSrv = inject(LocalStorageService);

  constructor() {
    this._populate();
  }

  public async getAll(): Promise<Category[]> {
    const categories = this._localStorageSrv.getItem<Category[]>(
      this._storageKey
    );

    return categories ?? [];
  }

  private _populate() {
    const categories = this._localStorageSrv.getItem(this._storageKey);

    if (categories) return;

    const temp: Category[] = [
      {
        id: crypto.randomUUID(),
        createdAt: new Date(Date.now()).toISOString(),
        name: 'Higiene y Cuidado Personal',
        description: 'Productos de aseo e higiene',
      },
      {
        id: crypto.randomUUID(),
        createdAt: new Date(Date.now()).toISOString(),
        name: 'Lácteos',
        description: 'Leche, yogurt, quesos',
      },
      {
        id: crypto.randomUUID(),
        createdAt: new Date(Date.now()).toISOString(),
        name: 'Panadería',
        description: 'Pan, galletas, productos de panadería',
      },
      {
        id: crypto.randomUUID(),
        createdAt: new Date(Date.now()).toISOString(),
        name: 'Limpieza',
        description: 'Productos para limpieza del hogar',
      },
      {
        id: crypto.randomUUID(),
        createdAt: new Date(Date.now()).toISOString(),
        name: 'Bebidas',
        description: 'Bebidas alcohólicas y no alcohólicas',
      },
    ];

    this._localStorageSrv.setItem(this._storageKey, temp);
  }
}
