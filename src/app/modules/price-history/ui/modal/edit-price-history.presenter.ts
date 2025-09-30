import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormControlConverter } from '@shared/interface';

export interface EditPriceHistoryFormValue {
  id: string | null;
  presentation_id: string;
  store_id: string;
  notes: string | null;
  price: string;
}

@Injectable()
export class EditPriceHistoryPresenter {
  public readonly form: FormGroup<
    FormControlConverter<EditPriceHistoryFormValue>
  >;

  private readonly _idCtrl = new FormControl<string | null>(null);
  private readonly _presentationIdCtrl = new FormControl<string>('', {
    validators: [Validators.required],
    nonNullable: true,
  });
  private readonly _storeIdCtrl = new FormControl<string>('', {
    validators: [Validators.required],
    nonNullable: true,
  });
  private readonly _notesCtrl = new FormControl<string | null>(null);
  private readonly _priceCtrl = new FormControl<string>('', {
    validators: [Validators.required],
    nonNullable: true,
  });

  public constructor() {
    this.form = new FormGroup({
      id: this._idCtrl,
      presentation_id: this._presentationIdCtrl,
      store_id: this._storeIdCtrl,
      notes: this._notesCtrl,
      price: this._priceCtrl,
    });
  }

  public get value(): EditPriceHistoryFormValue {
    return this.form.getRawValue();
  }
}
