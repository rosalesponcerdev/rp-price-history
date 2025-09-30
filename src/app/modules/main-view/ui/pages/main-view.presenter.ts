import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ListFormGroup } from '../interface/list.interface';

@Injectable()
export class MainViewPresenter {
  public form: FormGroup<ListFormGroup>;

  constructor() {
    this.form = new FormGroup({
      search: new FormControl('', {
        nonNullable: true,
      }),
      category: new FormControl('', { nonNullable: true }),
    });
  }
}
