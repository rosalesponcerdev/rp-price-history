import { InjectionToken } from '@angular/core';

import { StorePort } from '@shared/context/store/domain/port';

export const STORE_HTTP_REPOSITORY = new InjectionToken<StorePort>(
  'StoreHttpRepository'
);
