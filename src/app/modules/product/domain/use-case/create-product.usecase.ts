import { CreateProduct, Product } from '../model/product.model';
import { ProductRepositoryPort } from '../port/product-repository.port';

export class CreateProductUseCase {
  constructor(private readonly _productRepositoryPort: ProductRepositoryPort) {}

  execute(product: CreateProduct): Promise<Product> {
    return this._productRepositoryPort.create(product);
  }
}
