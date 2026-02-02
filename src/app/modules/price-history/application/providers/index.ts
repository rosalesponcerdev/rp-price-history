import { Provider } from '@angular/core';

import { PriceHistoryService } from '@price-history/application/price-history.service';
import {
  GetPriceHistoryByPresentationHtpApplicationUseCase,
  RecordPriceHistoryHttpApplicationUseCase,
} from '@price-history/application/use-case';
import { PriceHistoryLocalRepository } from '@price-history/infrastructure/repository';
import { PRICE_HISTORY_HTTP_REPOSITORY } from './token';

export function providePriceHistory(): Provider[] {
  return [
    {
      provide: PRICE_HISTORY_HTTP_REPOSITORY,
      // useClass: PriceHistoryHttpRepository,
      useClass: PriceHistoryLocalRepository,
    },
    RecordPriceHistoryHttpApplicationUseCase,
    GetPriceHistoryByPresentationHtpApplicationUseCase,
    PriceHistoryService,
  ];
}
