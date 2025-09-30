import { PresentationPort } from '../port';

export class GetPresentationByIdUseCase {
  constructor(private readonly _presentationPort: PresentationPort) {}

  execute(presentationId: string) {
    return this._presentationPort.getById(presentationId);
  }
}
