import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Item } from '@core/interface/item.interface';
import { ItemService } from '@core/service/item.service';
import { ADD_ITEM_FORM } from './add-item.form';
import { Router } from '@angular/router';
import { FormGroupModel } from '@core/interface/form-group-model.interface';

@Component({
  selector: 'rp-add-item',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
})
export class AddItemComponent {
  form: FormGroupModel<Item> = ADD_ITEM_FORM();

  loading = signal<boolean>(false);

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
