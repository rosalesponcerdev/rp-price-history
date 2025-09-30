import { inject, Injectable } from '@angular/core';

import { CategoryState } from '@shared/state/category.state';
import { CategoryHttpRepository } from '@category/infrastructure/repository/category.repository';
import { ListCategoryUseCase } from '@category/domain/use-case/list-category.usecase';
import { Category } from '@category/domain/model/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly _categoryRepository = inject(CategoryHttpRepository);
  private readonly _categoryState = inject(CategoryState);
  private readonly _listUseCase: ListCategoryUseCase;

  constructor() {
    this._listUseCase = new ListCategoryUseCase(this._categoryRepository);
  }

  async list(): Promise<Category[]> {
    if (this._categoryState.categories.length > 0) {
      return this._categoryState.categories;
    }

    const categories = await this._listUseCase.execute();

    this._categoryState.categories = categories;

    return categories;
  }
}
