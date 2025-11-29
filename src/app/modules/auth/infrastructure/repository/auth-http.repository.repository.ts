import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { EndPoint } from '@shared/enum';

import { Session } from '@auth/domain/model';
import { AuthPort } from '@auth/domain/port';

@Injectable()
export class AuthHttpRepository implements AuthPort {
  private readonly _httpSrv = inject(HttpClient);

  public signIn(email: string, password: string): Promise<Session> {
    const url = EndPoint.SIGN_IN;

    return lastValueFrom(this._httpSrv.post<Session>(url, { email, password }));
  }

  public signUp(email: string, password: string): Promise<Session> {
    const url = EndPoint.SIGN_UP;

    return lastValueFrom(this._httpSrv.post<Session>(url, { email, password }));
  }

  public refreshSession(refreshToken: string): Promise<Session> {
    const url = EndPoint.REFRESH_SESSION;

    return lastValueFrom(this._httpSrv.post<Session>(url, { refreshToken }));
  }
}
