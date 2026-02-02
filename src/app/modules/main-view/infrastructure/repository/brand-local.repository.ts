import { inject, Injectable } from '@angular/core';

import { Brand, NewBrand } from '@main-view/domain/model';
import { BrandPort } from '@main-view/domain/port';
import { LocalStorageService } from '@shared/services';

@Injectable()
export class BrandLocalRepository implements BrandPort {
  private readonly _storageKey = 'MEASUREMENT_UNITS';

  private readonly _localStorageSrv = inject(LocalStorageService);

  public async getAll(): Promise<Brand[]> {
    const brandList = this._localStorageSrv.getItem<Brand[]>(this._storageKey);

    return brandList ?? [];
  }

  public async create({ name }: NewBrand): Promise<Brand> {
    const brandList = await this.getAll();

    const tempNewBrand: Brand = {
      id: crypto.randomUUID(),
      name,
      created_at: new Date(Date.now()).toISOString(),
    };

    this._localStorageSrv.setItem(this._storageKey, [
      tempNewBrand,
      ...brandList,
    ]);

    return tempNewBrand;
  }

  public async getById(id: string): Promise<Brand> {
    const brandList = await this.getAll();

    const foundedBrand = brandList.find(b => b.id === id);

    if (!foundedBrand) throw 'NO FOUND BRAND';

    return foundedBrand;
  }
}
