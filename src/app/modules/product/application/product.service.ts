import { inject, Injectable } from '@angular/core';

import { ListFormValue } from '@main-view/ui/interface';
import { CreateProduct, Product } from '@product/domain/model/product.model';
import {
  CreateProductAppUseCase,
  FilterProductAppUseCase,
  GetProductByIdAppUseCase,
  ListProductAppUseCase,
} from './use-case';

@Injectable()
export class ProductService {
  private readonly _listProductUseCase = inject(ListProductAppUseCase);
  private readonly _filterProductUseCase = inject(FilterProductAppUseCase);
  private readonly _createProductUseCase = inject(CreateProductAppUseCase);
  private readonly _getProductByIdUseCase = inject(GetProductByIdAppUseCase);

  public list(): Promise<Product[]> {
    return this._listProductUseCase.execute();
  }

  public getByCriteria(criteria: ListFormValue): Promise<Product[]> {
    return this._filterProductUseCase.execute(criteria);
  }

  public create(product: CreateProduct): Promise<Product> {
    return this._createProductUseCase.execute(product);
  }

  public getById(id: string): Promise<Product> {
    return this._getProductByIdUseCase.execute(id);
  }
}
