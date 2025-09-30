import { inject, Injectable } from '@angular/core';

import { Loading } from '@shared/class';
import { BrandState } from '@shared/state';

import { Brand, NewBrand } from '@main-view/domain/model/brand.model';
import {
  CreateBrandUseCase,
  GetBrandByIdUseCase,
  GetBrandUseCase,
} from '@main-view/domain/use-case';
import { BrandHttpRepository } from '@main-view/infrastructure/repository';

@Injectable({ providedIn: 'root' })
export class BrandService extends Loading<{
  create: boolean;
  getAll: boolean;
  getById: boolean;
}> {
  private readonly _getBrandUseCase: GetBrandUseCase;
  private readonly _crateBrandUseCase: CreateBrandUseCase;
  private readonly _getBrandByIdUseCase: GetBrandByIdUseCase;

  private readonly _getBrandHttpRepository = inject(BrandHttpRepository);
  private readonly _brandState = inject(BrandState);

  constructor() {
    super({
      create: false,
      getAll: false,
      getById: false,
    });

    this._getBrandUseCase = new GetBrandUseCase(this._getBrandHttpRepository);
    this._crateBrandUseCase = new CreateBrandUseCase(
      this._getBrandHttpRepository
    );
    this._getBrandByIdUseCase = new GetBrandByIdUseCase(
      this._getBrandHttpRepository
    );
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
