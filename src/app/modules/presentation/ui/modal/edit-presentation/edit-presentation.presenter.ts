import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CreatePresentation } from '@presentation/domain/model';

interface EditFormGroup {
  additionalDescription: FormControl<
    Required<CreatePresentation['additionalDescription']>
  >;
  unitOfMeasureId: FormControl<Required<
    CreatePresentation['unitOfMeasureId']
  > | null>;
  presentationName: FormControl<Required<
    CreatePresentation['presentationName']
  > | null>;
  productId: FormControl<Required<CreatePresentation['productId']> | null>;
  quantity: FormControl<Required<CreatePresentation['quantity']> | null>;
  brandId: FormControl<Required<CreatePresentation['brandId']> | null>;
}

@Injectable()
export class EditPresentationPresenter {
  public readonly form;

  private readonly _additionalDescriptionCtrl = new FormControl<string | null>(
    null
  );
  private readonly _unitOfMeasureIdCtrl = new FormControl<number | null>(null, [
    Validators.required,
  ]);
  private readonly _presentationNameCtrl = new FormControl<string | null>(
    null,
    [Validators.required]
  );
  private readonly _productIdCtrl = new FormControl<number | null>(null, [
    Validators.required,
  ]);
  private readonly _quantityCtrl = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(0),
  ]);
  private readonly _brandIdCtrl = new FormControl<number | null>(null, [
    Validators.required,
  ]);

  public constructor() {
    this.form = new FormGroup<EditFormGroup>({
      productId: this._productIdCtrl,
      unitOfMeasureId: this._unitOfMeasureIdCtrl,
      presentationName: this._presentationNameCtrl,
      quantity: this._quantityCtrl,
      brandId: this._brandIdCtrl,
      additionalDescription: this._additionalDescriptionCtrl,
    });
  }

  get value() {
    return this.form.value as CreatePresentation;
  }
}
