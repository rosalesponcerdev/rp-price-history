import { FormControl } from '@angular/forms';

export type FormControlConverter<T> = {
  [K in keyof T]: FormControl<T[K]>;
};
