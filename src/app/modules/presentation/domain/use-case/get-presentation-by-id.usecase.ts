import { PresentationPort } from '@presentation/domain/port';

export class GetPresentationByIdUseCase {
  constructor(private readonly _presentationPort: PresentationPort) {}

  public execute(presentationId: string) {
    return this._presentationPort.getById(presentationId);
  }
}
