import { inject, Injectable } from '@angular/core';

import { Category } from '@category/domain/model';
import { CATEGORY_REPOSITORY } from '../providers/token';

@Injectable()
export class ListCategoryAppUseCase {
  private readonly _categoryRepository = inject(CATEGORY_REPOSITORY);

  public execute(): Promise<Category[]> {
    return this._categoryRepository.getAll();
  }
}
