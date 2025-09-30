import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NewBrand } from '@main-view/domain/model/brand.model';

interface BrandFormGroup {
  name: FormControl<Required<NewBrand['name']>>;
}

@Injectable()
export class BrandModalPresenter {
  form: FormGroup<BrandFormGroup>;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }
}
