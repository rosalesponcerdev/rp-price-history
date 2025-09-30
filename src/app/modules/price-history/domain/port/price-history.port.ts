import { CreatePriceHistory, PriceHistory } from '../model';

export interface PriceHistoryPort {
  create(createPriceHistory: CreatePriceHistory): Promise<PriceHistory>;
  getByPresentation(presentationId: string): Promise<PriceHistory[]>;
}
