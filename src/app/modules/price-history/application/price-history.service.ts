import { inject, Injectable } from '@angular/core';

import { Loading } from '@shared/class';
import { PriceHistoryState } from '@shared/state';

import { Presentation } from '@presentation/domain/model';
import { CreatePriceHistory, PriceHistory } from '@price-history/domain/model';
import {
  GetPriceHistoryByPresentationHtpApplicationUseCase,
  RecordPriceHistoryHttpApplicationUseCase,
} from './use-case';

@Injectable()
export class PriceHistoryService extends Loading<{
  create: boolean;
  getByPresentationId: boolean;
}> {
  private readonly _recordPriceHistoryHttpApplicationUseCase = inject(
    RecordPriceHistoryHttpApplicationUseCase
  );
  private readonly _getPriceHistoryByPresentationHtpApplicationUseCase = inject(
    GetPriceHistoryByPresentationHtpApplicationUseCase
  );

  private readonly _priceHistoryState = inject(PriceHistoryState);

  public constructor() {
    super({
      create: false,
      getByPresentationId: false,
    });
  }

  public async create(
    createPriceHistory: CreatePriceHistory,
    presentation: Presentation
  ): Promise<PriceHistory> {
    this._setLoading('create');

    const priceHistory =
      await this._recordPriceHistoryHttpApplicationUseCase.execute(
        createPriceHistory,
        presentation
      );

    this._setLoading('create', false);

    return priceHistory;
  }

  public async getByPresentationId(presentationId: string) {
    this._setLoading('getByPresentationId');

    const priceHistoryList =
      await this._getPriceHistoryByPresentationHtpApplicationUseCase.execute(
        presentationId
      );

    this._priceHistoryState.list = priceHistoryList;

    this._setLoading('getByPresentationId', false);

    return priceHistoryList;
  }
}
