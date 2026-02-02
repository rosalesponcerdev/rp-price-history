import { registerLocaleData } from '@angular/common';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import localeEsPe from '@angular/common/locales/es-PE';
import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
} from '@angular/router';

import { provideAuth } from '@auth/application/provider';
import { provideCategory } from '@category/application/providers';
import { provideBrand } from '@main-view/application/providers';
import { provideMeasurementUnits } from '@measurement-units/application/providers';
import { provideProduct } from '@product/application/provider';
import { routes } from './app.routes';
import { authInterceptor } from './shared/interceptors';
import { ModalService } from './shared/services';

registerLocaleData(localeEsPe);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding(), withHashLocation()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAuth(),
    provideCategory(),
    provideBrand(),
    provideProduct(),
    provideMeasurementUnits(),
    ModalService,
  ],
};
