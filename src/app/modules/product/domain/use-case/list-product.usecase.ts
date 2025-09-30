import { ProductRepositoryPort } from '../port/product-repository.port';
import { Product } from '../model/product.model';

export class ListProductUseCase {
  constructor(private readonly _productRepository: ProductRepositoryPort) {}

  execute(): Promise<Product[]> {
    return this._productRepository.getAll();
  }
}
