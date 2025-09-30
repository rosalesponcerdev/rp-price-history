import { CreatePresentation, Presentation } from '@presentation/domain/model';
import { PresentationPort } from '@presentation/domain/port';

export class CreatePresentationUseCase {
  constructor(private readonly _presentationPort: PresentationPort) {}

  execute(createPresentation: CreatePresentation): Promise<Presentation> {
    return this._presentationPort.create(createPresentation);
  }
}
