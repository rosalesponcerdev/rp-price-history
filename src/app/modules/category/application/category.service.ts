import { inject, Injectable } from '@angular/core';

import { CategoryState } from '@shared/state/category.state';

import { Category } from '@category/domain/model/category.model';
import { ListCategoryAppUseCase } from './use-case';

@Injectable()
export class CategoryService {
  private readonly _categoryState = inject(CategoryState);
  private readonly _listUseCase = inject(ListCategoryAppUseCase);

  public async list(): Promise<Category[]> {
    if (this._categoryState.categories.length > 0) {
      return this._categoryState.categories;
    }

    const categories = await this._listUseCase.execute();

    this._categoryState.categories = categories;

    return categories;
  }
}
