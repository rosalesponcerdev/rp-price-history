import { ListFormValue } from '@main-view/ui/interface/list.interface';

import { ProductRepositoryPort } from '../port/product-repository.port';
import { Product } from '../model/product.model';

export class FilterProductUseCase {
  constructor(private readonly _productRepository: ProductRepositoryPort) {}

  async execute(criteria: ListFormValue): Promise<Product[]> {
    return this._productRepository.getByCriteria(criteria);
  }
}
