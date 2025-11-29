import { InjectionToken } from '@angular/core';

import { RefreshSessionUseCase, SignInUseCase } from '@auth/domain/use-case';

export const SIGN_IN_HTTP = new InjectionToken<SignInUseCase>('SIGN_IN_HTTP');
export const REFRESH_SESSION_HTTP = new InjectionToken<RefreshSessionUseCase>(
  'REFRESH_SESSION_HTTP'
);
