import { inject, Injectable } from '@angular/core';

import { PRODUCT_PORT } from '@product/application/provider/token';
import { Product } from '@product/domain/model';

@Injectable()
export class GetProductByIdAppUseCase {
  private readonly _productPort = inject(PRODUCT_PORT);

  public execute(id: string): Promise<Product> {
    return this._productPort.getById(id);
  }
}
