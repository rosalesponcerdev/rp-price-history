import { InjectionToken } from '@angular/core';

import { ProductRepositoryPort } from '@product/domain/port';

export const PRODUCT_PORT = new InjectionToken<ProductRepositoryPort>(
  'PRODUCT_PORT'
);
