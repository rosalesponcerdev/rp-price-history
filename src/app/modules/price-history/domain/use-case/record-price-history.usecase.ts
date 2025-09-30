import { Presentation } from '@presentation/domain/model';
import { CreatePriceHistory, PriceHistory } from '@price-history/domain/model';
import { PriceHistoryPort } from '@price-history/domain/port';

export class RecordPriceHistoryUseCase {
  constructor(private readonly _priceHistoryPort: PriceHistoryPort) {}

  public execute(
    createPriceHistory: CreatePriceHistory,
    presentation: Presentation
  ): Promise<PriceHistory> {
    createPriceHistory.price_per_base_unit = this._getPricePerBaseUnit({
      price: createPriceHistory.price,
      quantity: presentation.quantity,
    });

    return this._priceHistoryPort.create(createPriceHistory);
  }

  private _getPricePerBaseUnit({
    quantity,
    price,
  }: {
    quantity: number;
    price: number;
  }) {
    return quantity / price;
  }
}
