import { Provider } from '@angular/core';
import { PresentationHttpRepository } from '@presentation/infrastructure/repository';
import { PresentationService } from '@presentation/application';

export function providePresentation(): Provider[] {
  return [PresentationHttpRepository, PresentationService];
}
