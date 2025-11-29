import { Component, inject } from '@angular/core';

import { AuthService } from '@auth/application/auth.service';
import { LoginPageUiComponent } from './login.ui';

@Component({
  selector: 'rp-login-page',
  imports: [LoginPageUiComponent],
  template: `<rp-login-page-ui
    [loading]="authSrv.login$()"
    (sigIn)="sigInHandler($event)" />`,
})
export class LoginPage {
  public readonly authSrv = inject(AuthService);

  public sigInHandler(formValue: { email: string; password: string }) {
    this.authSrv.signIn(formValue);
  }
}
