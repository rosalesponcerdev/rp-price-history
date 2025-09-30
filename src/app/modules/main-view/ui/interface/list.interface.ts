import { FormControl } from '@angular/forms';

export interface ListFormGroup {
  search: FormControl<string>;
  category: FormControl<string>;
}

export interface ListFormValue {
  search: string;
  category: string;
}
