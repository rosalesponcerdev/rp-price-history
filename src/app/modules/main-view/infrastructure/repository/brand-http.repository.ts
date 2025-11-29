import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { EndPoint } from '@shared/enum';

import { Brand, NewBrand } from '@main-view/domain/model/brand.model';
import { BrandPort } from '@main-view/domain/port/brand.port';
import {
  BrandApi,
  NewBrandApi,
} from '@main-view/infrastructure/interface/brand-api.interface';
import { BrandTransformer } from '@main-view/infrastructure/transformer';

@Injectable()
export class BrandHttpRepository implements BrandPort {
  private readonly URL = `/${EndPoint.BRAND}`;

  private readonly _httpSrv = inject(HttpClient);

  public async getAll(): Promise<Brand[]> {
    const params = new HttpParams().set('select', '*');

    const brands = await lastValueFrom(
      this._httpSrv.get<BrandApi[]>(this.URL, {
        params,
      })
    );

    return brands.map(b => BrandTransformer.from(b));
  }

  public async create(newBrand: NewBrand): Promise<Brand> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Prefer', 'return=representation');

    const body: NewBrandApi = BrandTransformer.saveTo(newBrand);

    const [savedBrand] = await lastValueFrom(
      this._httpSrv.post<BrandApi[]>(this.URL, body, { headers })
    );

    return BrandTransformer.from(savedBrand);
  }

  public async getById(id: string): Promise<Brand> {
    const params = new HttpParams({
      fromObject: {
        id: `eq.${id}`,
      },
    });

    const [brand] = await lastValueFrom(
      this._httpSrv.get<BrandApi[]>(this.URL, {
        params,
      })
    );

    return BrandTransformer.from(brand);
  }
}
