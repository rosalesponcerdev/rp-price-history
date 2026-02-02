import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { EndPoint } from '@shared/enum';

import { Category } from '@category/domain/model';
import { CategoryDto } from '@category/infrastructure/dto';
import { CategoryRepositoryPort } from '@category/domain/port';
import { CategoryAdapter } from '@category/infrastructure/adapter';

@Injectable()
export class CategoryHttpRepository implements CategoryRepositoryPort {
  private readonly _httpClient = inject(HttpClient);

  public async getAll(): Promise<Category[]> {
    const url = `/${EndPoint.CATEGORIES}`;

    const params = new HttpParams().set('select', 'id,nombre');

    const categories = await lastValueFrom(
      this._httpClient.get<CategoryDto[]>(url, {
        params,
      })
    );

    return categories.map(category => CategoryAdapter.from(category));
  }
}
