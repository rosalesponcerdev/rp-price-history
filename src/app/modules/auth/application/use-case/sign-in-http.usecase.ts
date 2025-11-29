import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { RoutesEnum } from '@shared/enum';

import { SignInUseCase } from '@auth/domain/use-case';
import { AuthHttpRepository } from '@auth/infrastructure/repository';
import { SessionStore } from '../store';

@Injectable()
export class SignInHttpUseCase {
  private readonly _signInUseCase: SignInUseCase;

  private readonly _authHttpRepository = inject(AuthHttpRepository);
  private readonly _sessionStore = inject(SessionStore);
  private readonly _router = inject(Router);

  constructor() {
    this._signInUseCase = new SignInUseCase(this._authHttpRepository);
  }

  public async execute(email: string, password: string) {
    const session = await this._signInUseCase.execute(email, password);
    this._sessionStore.state = session;

    this._router.navigate([RoutesEnum.BASE]);
  }
}
