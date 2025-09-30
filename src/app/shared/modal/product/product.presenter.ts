import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Product } from '@product/domain/model/product.model';

interface ProductFormGroup {
  categoryId: FormControl<Required<Product['categoryId']>>;
  description: FormControl<Required<Product['description']>>;
  name: FormControl<Required<Product['name']>>;
  measurementUnitId: FormControl<Required<Product['measurementUnitId']>>;
}

@Injectable()
export class ProductModalPresenter {
  public form: FormGroup;

  constructor() {
    this.form = new FormGroup<ProductFormGroup>({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      categoryId: new FormControl(null, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      measurementUnitId: new FormControl(null, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }
}
