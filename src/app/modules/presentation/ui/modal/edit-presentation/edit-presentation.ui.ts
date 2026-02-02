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
import { RpSelectComponent } from '@shared/components/select/select.component';
import { RpTextAreaComponent } from '@shared/components/text-area/text-area.component';

import { Brand } from '@main-view/domain/model';
import { BrandAdapter } from '@modules/main-view/infrastructure/adapter';
import { MeasurementUnits } from '@measurement-units/domain/model/measurement-units.model';
import { MeasurementUnitsTransformer } from '@modules/measurement-units/infrastructure/adapter';
import { CreatePresentation } from '@presentation/domain/model';
import { Product } from '@product/domain/model';
import { EditPresentationPresenter } from './edit-presentation.presenter';

@Component({
  selector: 'rp-edit-presentation-ui',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    RpInputComponent,
    RpSelectComponent,
    RpTextAreaComponent,
  ],
  providers: [EditPresentationPresenter],
  templateUrl: './edit-presentation.ui.html',
})
export class EditPresentationModalUi implements OnChanges {
  public readonly product = input<Product | undefined>(undefined);
  public readonly loading = input<boolean>(false);

  public readonly save = output<CreatePresentation>();
  public readonly cancelModal = output();

  public readonly brands = input.required({
    transform: (brands: Brand[]) => BrandAdapter.toItemArray(brands),
  });

  public readonly measurementUnits = input.required({
    transform: (measurementUnits: MeasurementUnits[]) =>
      MeasurementUnitsTransformer.toItemArray(measurementUnits),
  });

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['product']?.currentValue) return;

    this.editPresentationPrt.form.patchValue({
      productId: changes['product'].currentValue?.id,
    });
  }

  protected readonly editPresentationPrt = inject(EditPresentationPresenter);

  protected submitFormHandler() {
    if (this.editPresentationPrt.form.invalid) return;

    this.save.emit(this.editPresentationPrt.value);
  }
}
