import { CreateProduct, Product } from '@product/domain/model';
import { ProductRepositoryPort } from '@product/domain/port';

export class CreateProductUseCase {
  constructor(private readonly _productRepositoryPort: ProductRepositoryPort) {}

  public execute(product: CreateProduct): Promise<Product> {
    return this._productRepositoryPort.create(product);
  }
}
