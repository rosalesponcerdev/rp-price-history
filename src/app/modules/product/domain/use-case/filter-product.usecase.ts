import { ListFormValue } from '@main-view/ui/interface/list.interface';
import { Product } from '@product/domain/model';
import { ProductRepositoryPort } from '@product/domain/port';

export class FilterProductUseCase {
  constructor(private readonly _productRepository: ProductRepositoryPort) {}

  public async execute(criteria: ListFormValue): Promise<Product[]> {
    return this._productRepository.getByCriteria(criteria);
  }
}
