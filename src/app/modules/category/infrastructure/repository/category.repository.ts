import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { EndPoint } from '@shared/enum';

import { CategoryRepositoryPort } from '../../domain/port/category-repository.port';
import { CategoryApi, Category } from '../../domain/model/category.model';
import { CategoryTransformer } from '../transformer/category.transformer';

@Injectable({ providedIn: 'root' })
export class CategoryHttpRepository implements CategoryRepositoryPort {
  private readonly _httpClient = inject(HttpClient);

  public async getAll(): Promise<Category[]> {
    const url = `${EndPoint.BASE_URL}/${EndPoint.CATEGORIES}`;

    const params = new HttpParams().set('select', 'id,nombre');

    const categories = await lastValueFrom(
      this._httpClient.get<CategoryApi[]>(url, {
        params,
      })
    );

    return categories.map(category => CategoryTransformer.from(category));
  }
}
