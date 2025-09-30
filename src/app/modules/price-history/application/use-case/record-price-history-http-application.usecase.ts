import { inject, Injectable } from '@angular/core';

import { Presentation } from '@presentation/domain/model';

import { CreatePriceHistory } from '@price-history/domain/model';
import { RecordPriceHistoryUseCase } from '@price-history/domain/use-case';
import { PRICE_HISTORY_HTTP_REPOSITORY } from '../providers/token';

@Injectable()
export class RecordPriceHistoryHttpApplicationUseCase {
  private readonly _recordPriceHistoryUseCase: RecordPriceHistoryUseCase;

  private readonly _priceHistoryHttpRepository = inject(
    PRICE_HISTORY_HTTP_REPOSITORY
  );

  constructor() {
    this._recordPriceHistoryUseCase = new RecordPriceHistoryUseCase(
      this._priceHistoryHttpRepository
    );
  }

  public execute(
    createPriceHistory: CreatePriceHistory,
    presentation: Presentation
  ) {
    return this._recordPriceHistoryUseCase.execute(
      createPriceHistory,
      presentation
    );
  }
}
