import { inject, Injectable } from '@angular/core';
import { Product } from '@product/domain/model';

import { PRODUCT_PORT } from '../provider/token';

@Injectable()
export class ListProductAppUseCase {
  private readonly _productPort = inject(PRODUCT_PORT);

  public execute(): Promise<Product[]> {
    return this._productPort.getAll();
  }
}
