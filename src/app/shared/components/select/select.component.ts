import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { RpBaseValueAccessor } from '../../directives';
@Component({
  selector: 'rp-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpSelectComponent),
      multi: true,
    },
  ],
  template: `<select
    class="block w-full appearance-none rounded-md bg-white pr-8 pl-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    [ngClass]="className()"
    [value]="value()"
    [disabled]="disabled()"
    (change)="inputChangeHandler($event)"
    (blur)="blurHandler()">
    <option value="" selected>{{ placeholder() }}</option>

    @for (o of options(); track o.id) {
      <option [value]="o.id">{{ o.text }}</option>
    }
  </select>`,
})
export class RpSelectComponent extends RpBaseValueAccessor {
  public readonly options = input<
    {
      id: string | number;
      text: string;
    }[]
  >([]);
  public readonly placeholder = input<string>('');
  public readonly className = input<string>('');
  public readonly inputChange = output<string>();
  public readonly blurChange = output();

  public inputChangeHandler(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.inputChangeRegister(target.value);
    this.inputChange.emit(target.value);
  }

  public blurHandler(): void {
    this.blurChangeRegister();
    this.blurChange.emit();
  }
}
