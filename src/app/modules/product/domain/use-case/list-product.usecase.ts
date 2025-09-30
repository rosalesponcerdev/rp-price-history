import { Product } from '@product/domain/model';
import { ProductRepositoryPort } from '@product/domain/port';

export class ListProductUseCase {
  constructor(private readonly _productRepository: ProductRepositoryPort) {}

  public execute(): Promise<Product[]> {
    return this._productRepository.getAll();
  }
}
