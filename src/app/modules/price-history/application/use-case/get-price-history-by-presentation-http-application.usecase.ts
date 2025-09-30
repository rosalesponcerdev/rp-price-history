import { inject, Injectable } from '@angular/core';
import { GetPriceHistoryByPresentationUseCase } from '../../domain/use-case';
import { PRICE_HISTORY_HTTP_REPOSITORY } from '../providers/token';

@Injectable()
export class GetPriceHistoryByPresentationHtpApplicationUseCase {
  private readonly _getPriceHistoryByPresentationHttpApplicationUseCase: GetPriceHistoryByPresentationUseCase;

  private readonly _priceHistoryHttpRepository = inject(
    PRICE_HISTORY_HTTP_REPOSITORY
  );

  constructor() {
    this._getPriceHistoryByPresentationHttpApplicationUseCase =
      new GetPriceHistoryByPresentationUseCase(
        this._priceHistoryHttpRepository
      );
  }

  public execute(presentationId: string) {
    return this._getPriceHistoryByPresentationHttpApplicationUseCase.execute(
      presentationId
    );
  }
}
