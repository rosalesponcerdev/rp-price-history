import {
  provideHttpClient,
  withInterceptors,
  withRequestsMadeViaParent,
} from '@angular/common/http';

import { authInterceptor } from '@shared/interceptors';
import { ModalService } from '@shared/services';
import {
  BrandState,
  CategoryState,
  MeasurementUnitsState,
  PriceHistoryState,
  StoreState,
} from '@shared/state';

import { CategoryService } from '@category/application/category.service';
import { CategoryHttpRepository } from '@category/infrastructure/repository/category.repository';
import { BrandService } from '@main-view/application/use-case/brand.service';
import { BrandHttpRepository } from '@main-view/infrastructure/repository';
import { MeasurementUnitsService } from '@measurement-units/application/use-case/measurement-units.service';
import { MeasurementUnitsHttpRepository } from '@measurement-units/infrastructure/repository/measurement-units.repository';
import { PresentationState } from '@presentation/application/state';
import { ProductService } from '@product/application/use-case';
import { ProductHttpRepository } from '@product/infrastructure/repository/product.repository';

export const providePortal = () => [
  provideHttpClient(
    withInterceptors([authInterceptor]),
    withRequestsMadeViaParent()
  ),

  PresentationState,
  MeasurementUnitsState,
  StoreState,
  CategoryState,
  PriceHistoryState,
  BrandState,

  BrandHttpRepository,
  ProductHttpRepository,
  CategoryHttpRepository,
  MeasurementUnitsHttpRepository,

  BrandService,
  MeasurementUnitsService,
  ProductService,
  CategoryService,
  ModalService,
];
