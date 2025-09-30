import { inject, Injectable } from '@angular/core';

import { ListFormValue } from '@main-view/ui/interface/list.interface';
import { CreateProduct, Product } from '@product/domain/model/product.model';
import { ListProductUseCase } from '@product/domain/use-case/list-product.usecase';
import { ProductHttpRepository } from '@product/infrastructure/repository/product.repository';
import { FilterProductUseCase } from '@product/domain/use-case/filter-product.usecase';
import { CreateProductUseCase } from '@product/domain/use-case/create-product.usecase';
import { GetProductByIdUseCase } from '../../domain/use-case/get-product-by-id.usecase';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly _productRepository = inject(ProductHttpRepository);

  private readonly _listProductUseCase: ListProductUseCase;
  private readonly _filterProductUseCase: FilterProductUseCase;
  private readonly _createProductUseCase: CreateProductUseCase;
  private readonly _getProductByIdUseCase: GetProductByIdUseCase;

  constructor() {
    this._listProductUseCase = new ListProductUseCase(this._productRepository);

    this._filterProductUseCase = new FilterProductUseCase(
      this._productRepository
    );

    this._createProductUseCase = new CreateProductUseCase(
      this._productRepository
    );

    this._getProductByIdUseCase = new GetProductByIdUseCase(
      this._productRepository
    );
  }

  list(): Promise<Product[]> {
    return this._listProductUseCase.execute();
  }

  getByCriteria(criteria: ListFormValue): Promise<Product[]> {
    return this._filterProductUseCase.execute(criteria);
  }

  create(product: CreateProduct): Promise<Product> {
    return this._createProductUseCase.execute(product);
  }

  getById(id: string): Promise<Product> {
    return this._getProductByIdUseCase.execute(id);
  }
}
