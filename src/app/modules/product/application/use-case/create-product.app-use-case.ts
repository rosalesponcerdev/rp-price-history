import { inject, Injectable } from '@angular/core';

import { PRODUCT_PORT } from '@product/application/provider/token';
import { CreateProduct, Product } from '@product/domain/model';

@Injectable()
export class CreateProductAppUseCase {
  private readonly _productRepositoryPort = inject(PRODUCT_PORT);

  public execute(product: CreateProduct): Promise<Product> {
    return this._productRepositoryPort.create(product);
  }
}
