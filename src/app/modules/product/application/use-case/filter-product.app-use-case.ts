import { inject, Injectable } from '@angular/core';
import { ListFormValue } from '@main-view/ui/interface';
import { Product } from '@product/domain/model';
import { PRODUCT_PORT } from '../provider/token';

@Injectable()
export class FilterProductAppUseCase {
  private readonly _productRepository = inject(PRODUCT_PORT);

  public async execute(criteria: ListFormValue): Promise<Product[]> {
    return this._productRepository.getByCriteria(criteria);
  }
}
