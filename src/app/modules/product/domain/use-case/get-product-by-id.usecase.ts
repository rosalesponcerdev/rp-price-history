import { Product } from '../model/product.model';
import { ProductRepositoryPort } from '../port';

export class GetProductByIdUseCase {
  constructor(private readonly _productPort: ProductRepositoryPort) {}

  public execute(id: string): Promise<Product> {
    return this._productPort.getById(id);
  }
}
