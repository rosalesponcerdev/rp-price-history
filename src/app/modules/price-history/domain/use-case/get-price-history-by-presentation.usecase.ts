import { PriceHistory } from '../model';
import { PriceHistoryPort } from '../port';

export class GetPriceHistoryByPresentationUseCase {
  public constructor(private readonly _priceHistoryPort: PriceHistoryPort) {}

  public execute(presentationId: string): Promise<PriceHistory[]> {
    return this._priceHistoryPort.getByPresentation(presentationId);
  }
}
