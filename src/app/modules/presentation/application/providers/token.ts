import { InjectionToken } from '@angular/core';

import { PresentationPort } from '@presentation/domain/port';

export const PRESENTATION_PORT = new InjectionToken<PresentationPort>(
  'PRESENTATION_PORT'
);
