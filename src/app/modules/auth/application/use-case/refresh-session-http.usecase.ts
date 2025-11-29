import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  finalize,
  from,
  Observable,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';

import { RoutesEnum } from '@shared/enum';

import { Session } from '@auth/domain/model';
import { RefreshSessionUseCase } from '@auth/domain/use-case';
import { AuthHttpRepository } from '@auth/infrastructure/repository';
import { SessionStore } from '../store';

@Injectable()
export class RefreshSessionHttpUseCase {
  private refreshObs?: Observable<Session>;

  private readonly _refreshSessionUseCase: RefreshSessionUseCase;

  private readonly _authHttpRepository = inject(AuthHttpRepository);
  private readonly _sessionStore = inject(SessionStore);
  private readonly _router = inject(Router);

  constructor() {
    this._refreshSessionUseCase = new RefreshSessionUseCase(
      this._authHttpRepository
    );
  }

  public execute(): Observable<Session> {
    const refresh_token = this._sessionStore.state?.refresh_token;

    if (!refresh_token) {
      this._sessionStore.clear();

      this._router.navigate([RoutesEnum.LOGIN]);

      return throwError(() => new Error('REFRESH TOKEN'));
    }

    if (!this.refreshObs) {
      this.refreshObs = this._getRefreshObs(refresh_token);
    }

    return this.refreshObs;
  }

  private _getRefreshObs(refresh_token: string) {
    return from(this._refreshSessionUseCase.execute(refresh_token)).pipe(
      tap(session => {
        this._sessionStore.state = session;
      }),
      shareReplay(1),
      catchError(refreshError => {
        this._sessionStore.clear();
        this._router.navigate([RoutesEnum.LOGIN]);

        return throwError(() => refreshError);
      }),
      finalize(() => {
        this.refreshObs = undefined;
      })
    );
  }
}
