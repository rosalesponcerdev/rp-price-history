import {
  Component,
  inject,
  input,
  OnChanges,
  output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '@shared/components/button/button.component';
import { RpInputComponent } from '@shared/components/input/input.component';
import { LoginPresenter } from './login.presenter';

@Component({
  selector: 'rp-login-page-ui',
  templateUrl: './login.ui.html',
  imports: [
    RpInputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [LoginPresenter],
})
export class LoginPageUiComponent implements OnChanges {
  public readonly loading = input.required<boolean>();

  public readonly sigIn = output<typeof this.loginPrt.value>();

  public readonly loginPrt = inject(LoginPresenter);

  public ngOnChanges(changes: SimpleChanges): void {
    this.loginPrt.setDisabled(changes);
  }

  public sigInHandler() {
    if (!this.loginPrt.form.valid) return;

    this.sigIn.emit(this.loginPrt.value);
  }
}
