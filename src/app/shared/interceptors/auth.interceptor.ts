import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

import { BEARER, TOKEN_TYPE_MAP } from '@shared/constants';

import { AuthService } from '@auth/application/auth.service';
import { SessionStore } from '@auth/application/store';

const setAuthHeader = (
  req: HttpRequest<unknown>,
  sessionStore: SessionStore
) => {
  const tokenType = TOKEN_TYPE_MAP.get(
    sessionStore.state?.token_type ?? BEARER
  );
  const accessToken = sessionStore.state?.access_token;

  const newRequest = req.clone({
    headers: req.headers.append('Authorization', `${tokenType} ${accessToken}`),
  });

  return newRequest;
};

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const sessionStore = inject(SessionStore);
  const authService = inject(AuthService);

  const newRequest = setAuthHeader(req, sessionStore);

  return next(newRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== HttpStatusCode.Unauthorized) {
        console.error(`Error request: ${error.status}`);

        return throwError(() => error);
      }

      return authService.refreshToken().pipe(
        switchMap(() => {
          const retryRequest = setAuthHeader(req, sessionStore);

          return next(retryRequest);
        }),
        catchError(refreshError => throwError(() => refreshError))
      );
    })
  );
};
