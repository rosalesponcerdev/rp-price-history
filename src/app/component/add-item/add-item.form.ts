import { FormControl, FormGroup, Validators } from '@angular/forms';

export const ADD_ITEM_FORM = () =>
  new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    price: new FormControl<number | null>(null, [Validators.required]),
    quantity: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    unit: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
