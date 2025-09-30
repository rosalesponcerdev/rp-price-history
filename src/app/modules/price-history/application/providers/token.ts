import { InjectionToken } from '@angular/core';

import { PriceHistoryPort } from '../../domain/port';

export const PRICE_HISTORY_HTTP_REPOSITORY =
  new InjectionToken<PriceHistoryPort>('PriceHistoryHttpRepository');
