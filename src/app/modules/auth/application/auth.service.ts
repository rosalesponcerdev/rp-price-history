import {
  computed,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Session } from '@auth/domain/model';
import { RefreshSessionHttpUseCase, SignInHttpUseCase } from './use-case';

@Injectable()
export class AuthService {
  public readonly login$: Signal<boolean>;
  public refreshObs?: Observable<Session>;

  private readonly _login: WritableSignal<boolean>;

  private readonly _signInHttpUseCase = inject(SignInHttpUseCase);
  private readonly _refreshSessionHttpUseCase = inject(
    RefreshSessionHttpUseCase
  );

  constructor() {
    this._login = signal(false);
    this.login$ = computed(() => this._login());
  }

  public async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      this._login.set(true);

      await this._signInHttpUseCase.execute(email, password);
    } catch (_error) {
      this._login.set(false);
    }
  }

  public refreshToken(): Observable<Session> {
    console.debug('REFRESH TOKEN');

    return this._refreshSessionHttpUseCase.execute();
  }
}
