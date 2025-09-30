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
import { StoreAppMapper } from '@shared/context/store/application/mapper';
import { Store } from '@shared/context/store/domain/model';

import { Presentation } from '@presentation/domain/model';
import {
  EditPriceHistoryFormValue,
  EditPriceHistoryPresenter,
} from './edit-price-history.presenter';

@Component({
  selector: 'rp-edit-price-history-modal-ui',
  templateUrl: './edit-price-history.ui.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RpInputComponent,
    ButtonComponent,
    RpSelectComponent,
  ],
  providers: [EditPriceHistoryPresenter],
})
export class EditPriceHistoryModalUi implements OnChanges {
  public readonly loading = input.required<boolean>();
  public readonly presentation = input.required<Presentation | undefined>();
  public readonly stores = input.required({
    transform: (stores: Store[]) => StoreAppMapper.toItem(stores),
  });

  public readonly cancelModal = output();
  public readonly save = output<EditPriceHistoryFormValue>();

  public readonly editPriceHistoryPrt = inject(EditPriceHistoryPresenter);

  public ngOnChanges(changes: SimpleChanges): void {
    const { presentation } = changes;

    if (presentation?.currentValue)
      this._presentationChange(presentation.currentValue);
  }

  public saveHandler() {
    if (this.editPriceHistoryPrt.form.invalid) return;

    this.save.emit(this.editPriceHistoryPrt.value);
  }

  private _presentationChange(presentation: Presentation) {
    this.editPriceHistoryPrt.form.patchValue({
      presentation_id: presentation.id,
    });
  }
}
