import { inject, Injectable } from '@angular/core';

import { ListFormValue } from '@main-view/ui/interface';
import { CreateProduct, Product } from '@product/domain/model';
import { ProductRepositoryPort } from '@product/domain/port';
import { LocalStorageService } from '@shared/services';

@Injectable()
export class ProductLocalRepository implements ProductRepositoryPort {
  private readonly _storageKey = 'PRODUCTS';

  private readonly _localStorageSrv = inject(LocalStorageService);

  public async getAll(): Promise<Product[]> {
    const res = this._localStorageSrv.getItem<Product[]>(this._storageKey);

    return res ?? [];
  }

  public async getByCriteria({
    category,
    search,
  }: ListFormValue): Promise<Product[]> {
    const products = await this.getAll();

    const foundProducts = products.filter(p => {
      const validateCategory = category ? p.categoryId === category : true;

      const validateName = search
        ? p.name.toLocaleLowerCase().includes(search.toLowerCase())
        : true;

      return validateCategory && validateName;
    });

    return foundProducts ?? [];
  }

  public async create(product: CreateProduct): Promise<Product> {
    const products = await this.getAll();

    const newProduct: Product = {
      categoryId: product.categoryId,
      description: product.description,
      measurementUnitId: product.categoryId,
      name: product.name,
      createdAt: new Date(Date.now()).toISOString(),
      updatedAt: new Date(Date.now()).toISOString(),
      id: crypto.randomUUID(),
    };

    const newList = [newProduct, ...products];

    this._localStorageSrv.setItem(this._storageKey, newList);

    return newProduct;
  }

  public async getById(id: string): Promise<Product> {
    const products = await this.getAll();

    const foundProduct = products.find(p => p.id === id);

    if (!foundProduct) throw 'NO PRODUCT FOUND';

    return foundProduct;
  }
}
