import { inject, Injectable } from '@angular/core';

import { Loading } from '@shared/class';
import { BrandState } from '@shared/state';

import { Brand, NewBrand } from '@main-view/domain/model';
import {
  CreateBrandAppUseCase,
  GetBrandAppUseCase,
  GetBrandByIdAppUseCase,
} from './use-case';

@Injectable()
export class BrandService extends Loading<{
  create: boolean;
  getAll: boolean;
  getById: boolean;
}> {
  private readonly _getBrandUseCase = inject(GetBrandAppUseCase);
  private readonly _crateBrandUseCase = inject(CreateBrandAppUseCase);
  private readonly _getBrandByIdUseCase = inject(GetBrandByIdAppUseCase);
  private readonly _brandState = inject(BrandState);

  constructor() {
    super({
      create: false,
      getAll: false,
      getById: false,
    });
  }

  public async getAll(): Promise<Brand[]> {
    this._setLoading('create', true);

    if (this._brandState.brands.length > 0) {
      this._setLoading('create', false);
      return this._brandState.brands;
    }

    const brands = await this._getBrandUseCase.execute();

    this._brandState.brands = brands;

    this._setLoading('create', false);
    return this._brandState.brands;
  }

  public async create(newBrand: NewBrand): Promise<Brand> {
    this._setLoading('create', true);

    const savedBrand = await this._crateBrandUseCase.execute(newBrand);

    this._brandState.brands = [...this._brandState.brands, savedBrand];

    this._setLoading('create', false);
    return savedBrand;
  }

  public async getById(id: string): Promise<Brand> {
    this._setLoading('getById', true);

    const brand = await this._getBrandByIdUseCase.execute(id);

    if (brand) {
      this._brandState.currentBrand = brand;

      this._setLoading('getById', false);

      return brand;
    }

    const brandData = await this._getBrandByIdUseCase.execute(id);

    this._brandState.currentBrand = brandData;

    this._setLoading('getById', false);

    return brandData;
  }
}
