import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { EndPoint } from '@shared/enum/endpoint.enum';
import { ListFormValue } from '@main-view/ui/interface/list.interface';

import { ProductTransformer } from '@product/infrastructure/transformer/product.transformer';
import { ProductRepositoryPort } from '@product/domain/port/product-repository.port';
import {
  CreateProduct,
  CreateProductApi,
  Product,
  ProductApi,
} from '@product/domain/model/product.model';

@Injectable({ providedIn: 'root' })
export class ProductHttpRepository implements ProductRepositoryPort {
  private readonly _httpClient = inject(HttpClient);

  async getAll(): Promise<Product[]> {
    const url = `${EndPoint.BASE_URL}/${EndPoint.PRODUCTS}`;

    const products = await lastValueFrom(
      this._httpClient.get<ProductApi[]>(url, {
        params: {
          select: '*',
        },
      })
    );

    return products.map(product => ProductTransformer.from(product));
  }

  async getByCriteria(criteria: ListFormValue): Promise<Product[]> {
    const url = `${EndPoint.BASE_URL}/${EndPoint.PRODUCTS}`;

    const params: Record<string, string> = {
      select: '*',
    };

    const { category, search } = criteria;

    if (search) {
      params['nombre'] = `ilike.*${search}*`;
    }

    if (category) {
      params['categoria_id'] = `eq.${category}`;
    }

    const products = await lastValueFrom(
      this._httpClient.get<ProductApi[]>(url, {
        params,
      })
    );

    return products.map(product => ProductTransformer.from(product));
  }

  async create(product: CreateProduct): Promise<Product> {
    const url = `${EndPoint.BASE_URL}/${EndPoint.PRODUCTS}`;

    const body: CreateProductApi = {
      ...ProductTransformer.createTo(product),
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Prefer', 'return=representation');

    const [newProduct] = await lastValueFrom(
      this._httpClient.post<ProductApi[]>(url, body, { headers })
    );

    return ProductTransformer.from(newProduct);
  }

  async getById(id: string): Promise<Product> {
    const url = `${EndPoint.BASE_URL}/${EndPoint.PRODUCTS}`;

    const params = new HttpParams({
      fromObject: {
        select: '*,categorias(id,nombre)',
        id: `eq.${id}`,
      },
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const [product] = await lastValueFrom(
      this._httpClient.get<ProductApi[]>(url, {
        params,
        headers,
      })
    );

    return ProductTransformer.from(product);
  }
}
