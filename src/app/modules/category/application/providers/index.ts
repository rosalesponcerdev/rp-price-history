import { makeEnvironmentProviders } from '@angular/core';

import { CategoryService } from '@category/application/category.service';
import { ListCategoryAppUseCase } from '@category/application/use-case';
import { CategoryLocalRepository } from '@category/infrastructure/repository';
import { CATEGORY_REPOSITORY } from './token';

export const provideCategory = () =>
  makeEnvironmentProviders([
    {
      provide: CATEGORY_REPOSITORY,
      // useClass: CategoryHttpRepository,
      useClass: CategoryLocalRepository,
    },
    ListCategoryAppUseCase,

    CategoryService,
  ]);
