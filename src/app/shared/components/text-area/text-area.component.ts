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
  selector: 'rp-text-area',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpTextAreaComponent),
      multi: true,
    },
  ],
  template: `
    <textarea
      class="resize-none block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      [value]="value()"
      [ngClass]="className()"
      [rows]="rows()"
      [disabled]="disabled()"
      [autocomplete]="autocomplete()"
      [placeholder]="placeholder()"
      (input)="inputChangeHandler($event)"
      (blur)="blurHandler()"></textarea>
  `,
})
export class RpTextAreaComponent extends RpBaseValueAccessor {
  public readonly rows = input<string>('4');
  public readonly type = input<string>('text');
  public readonly placeholder = input<string>('');
  public readonly autocomplete = input<AutoFill>('off');
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
