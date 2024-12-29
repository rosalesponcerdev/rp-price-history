import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ItemService } from '@core/service/item.service';
import { Item } from '@coreinterfaces/item.interface';
import { FormGroupModel } from '@coreinterfaces/form-group-model.interface';
import { UnitOptions } from '@coreinterfaces/unit-options.interface';

import { ADD_ITEM_FORM, GET_UNIT_OPTIONS } from './add-item.form';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'rp-add-item',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonComponent],
  templateUrl: './add-item.component.html',
})
export class AddItemComponent {
  form: FormGroupModel<Item> = ADD_ITEM_FORM();

  loading = signal<boolean>(false);
  readonly options: UnitOptions[] = GET_UNIT_OPTIONS();

  private _itemSrv = inject(ItemService);
  private _router = inject(Router);

  submitHandler(formValue: Partial<Item>) {
    this.loading.set(true);

    this._itemSrv.save(formValue as Item).subscribe({
      next: res => {
        console.log(res);
        this._router.navigate(['/list']);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
