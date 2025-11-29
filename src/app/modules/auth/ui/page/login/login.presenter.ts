import { Injectable, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class LoginPresenter {
  public readonly form;

  constructor() {
    this.form = new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public get value() {
    return this.form.getRawValue();
  }

  public setDisabled(changes: SimpleChanges) {
    const loadingChange = changes['loading'];

    if (!loadingChange || loadingChange.firstChange) return;

    if (loadingChange.currentValue) this.form.disable();

    this.form.enable();
  }
}
