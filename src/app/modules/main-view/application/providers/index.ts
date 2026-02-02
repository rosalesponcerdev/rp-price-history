import { makeEnvironmentProviders } from '@angular/core';

import { BrandLocalRepository } from '@main-view/infrastructure/repository';
import { BrandService } from '../brand.service';
import {
  CreateBrandAppUseCase,
  GetBrandAppUseCase,
  GetBrandByIdAppUseCase,
} from '../use-case';
import { BRAND_PORT } from './token';

export const provideBrand = () =>
  makeEnvironmentProviders([
    {
      provide: BRAND_PORT,
      // useClass: BrandHttpRepository,
      useClass: BrandLocalRepository,
    },
    CreateBrandAppUseCase,
    GetBrandAppUseCase,
    GetBrandByIdAppUseCase,

    BrandService,
  ]);
