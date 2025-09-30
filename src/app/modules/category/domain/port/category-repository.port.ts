import { Category } from '../model/category.model';

export interface CategoryRepositoryPort {
  getAll(): Promise<Category[]>;
}
