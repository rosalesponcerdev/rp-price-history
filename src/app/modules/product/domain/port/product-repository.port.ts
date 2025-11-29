import { ListFormValue } from '@main-view/ui/interface';
import { CreateProduct, Product } from '../model/product.model';

export interface ProductRepositoryPort {
  getAll(): Promise<Product[]>;
  getByCriteria(criteria: ListFormValue): Promise<Product[]>;
  create(product: CreateProduct): Promise<Product>;
  getById(id: string): Promise<Product>;
}
