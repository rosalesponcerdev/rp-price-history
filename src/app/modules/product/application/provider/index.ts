import { makeEnvironmentProviders } from '@angular/core';

import { ProductLocalRepository } from '@product/infrastructure/repository';
import { ProductService } from '../product.service';
import {
  CreateProductAppUseCase,
  FilterProductAppUseCase,
  GetProductByIdAppUseCase,
  ListProductAppUseCase,
} from '../use-case';
import { PRODUCT_PORT } from './token';

export const provideProduct = () =>
  makeEnvironmentProviders([
    {
      provide: PRODUCT_PORT,
      // useClass: ProductHttpRepository,
      useClass: ProductLocalRepository,
    },
    CreateProductAppUseCase,
    FilterProductAppUseCase,
    GetProductByIdAppUseCase,
    ListProductAppUseCase,

    ProductService,
  ]);
