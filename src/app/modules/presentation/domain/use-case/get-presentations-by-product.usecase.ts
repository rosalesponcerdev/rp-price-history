import { ErrorCode } from '@shared/enum';

import { Presentation } from '@presentation/domain/model';
import { PresentationPort } from '@presentation/domain/port';

export class getPresentationsByProductUseCase {
  constructor(private readonly _presentationPort: PresentationPort) {}

  public execute(productId: number): Promise<Presentation[]> {
    if (!productId) throw new Error(ErrorCode.ERROR_EMPTY);

    return this._presentationPort.getPresentationsByProduct(productId);
  }
}
