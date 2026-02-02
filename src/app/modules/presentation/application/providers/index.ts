import { Provider } from '@angular/core';

import { ModalService } from '@shared/services';

import { PresentationService } from '@presentation/application/presentation.service';
import { PresentationLocalRepository } from '@presentation/infrastructure/repository';
import { PRESENTATION_PORT } from './token';

export function providePresentation(): Provider[] {
  return [
    ModalService,
    {
      provide: PRESENTATION_PORT,
      // useClass: PresentationHttpRepository,
      useClass: PresentationLocalRepository,
    },
    PresentationService,
  ];
}
