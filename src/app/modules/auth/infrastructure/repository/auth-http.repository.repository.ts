import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { EndPoint } from '@shared/enum';

import { Session } from '@auth/domain/model';
import { AuthPort } from '@auth/domain/port';
import { NO_AUTH_HTTP_CONTEXT } from '@shared/interceptors/context';

@Injectable()
export class AuthHttpRepository implements AuthPort {
  private readonly _httpSrv = inject(HttpClient);

  public signIn(email: string, password: string): Promise<Session> {
    const url = EndPoint.SIGN_IN;

    const context = new HttpContext().set(NO_AUTH_HTTP_CONTEXT, false);

    return lastValueFrom(
      this._httpSrv.post<Session>(
        url,
        { email, password },
        {
          context,
        }
      )
    );
  }

  public signUp(email: string, password: string): Promise<Session> {
    const url = EndPoint.SIGN_UP;
    const context = new HttpContext().set(NO_AUTH_HTTP_CONTEXT, false);

    return lastValueFrom(
      this._httpSrv.post<Session>(url, { email, password }, { context })
    );
  }

  public refreshSession(refreshToken: string): Promise<Session> {
    const url = EndPoint.REFRESH_SESSION;

    return lastValueFrom(this._httpSrv.post<Session>(url, { refreshToken }));
  }
}
