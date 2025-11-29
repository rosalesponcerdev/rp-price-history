import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
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
import { routes } from './app.routes';

registerLocaleData(localeEsPe);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding(), withHashLocation()),
    provideHttpClient(withFetch()),
    provideAuth(),
  ],
};
