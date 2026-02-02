import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NewBrand } from '@main-view/domain/model';

interface BrandFormGroup {
  name: FormControl<Required<NewBrand['name']>>;
}

@Injectable()
export class BrandModalPresenter {
  public form: FormGroup<BrandFormGroup>;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }
}
