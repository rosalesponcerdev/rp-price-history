import { makeEnvironmentProviders } from '@angular/core';

import { AuthHttpRepository } from '@auth/infrastructure/repository';
import { AuthService } from '../auth.service';
import { SessionStore } from '../store';
import { RefreshSessionHttpUseCase, SignInHttpUseCase } from '../use-case';

export const provideAuth = () =>
  makeEnvironmentProviders([
    AuthHttpRepository,
    SignInHttpUseCase,
    RefreshSessionHttpUseCase,
    SessionStore,
    AuthService,
  ]);
