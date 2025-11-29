import { Provider } from '@angular/core';
import { PresentationHttpRepository } from '@presentation/infrastructure/repository';
import { PresentationService } from '@presentation/application';
import { ModalService } from '@shared/services';

export function providePresentation(): Provider[] {
  return [ModalService, PresentationHttpRepository, PresentationService];
}
