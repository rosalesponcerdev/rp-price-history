import { CategoryRepositoryPort } from '@category/domain/port/category-repository.port';
import { Category } from '../model/category.model';

export class ListCategoryUseCase {
  constructor(private readonly _categoryRepository: CategoryRepositoryPort) {}

  public execute(): Promise<Category[]> {
    return this._categoryRepository.getAll();
  }
}
