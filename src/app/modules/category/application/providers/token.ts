import { InjectionToken } from '@angular/core';

import { CategoryRepositoryPort } from '@category/domain/port';

export const CATEGORY_REPOSITORY = new InjectionToken<CategoryRepositoryPort>(
  'CATEGORY_REPOSITORY'
);
