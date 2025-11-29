import { NgClass } from '@angular/common';
import { Component, forwardRef, input, output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RpBaseValueAccessor } from '@shared/directives';

@Component({
  selector: 'rp-input',
  imports: [NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpInputComponent),
      multi: true,
    },
  ],
  template: `<input
    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:opacity-70"
    [inputMode]="inputModeType()"
    [ngClass]="className()"
    [autocomplete]="autocomplete()"
    [type]="type()"
    [value]="value()"
    [placeholder]="placeholder()"
    [disabled]="disabled()"
    (input)="inputChangeHandler($event)"
    (blur)="blurHandler()" />`,
})
export class RpInputComponent extends RpBaseValueAccessor {
  public readonly inputModeType = input<string>('text');
  public readonly type = input<string>('text');
  public readonly placeholder = input<string>('');
  public readonly autocomplete = input<AutoFill>('off');
  public readonly className = input<string>('');
  public readonly inputChange = output<string>();
  public readonly blurChange = output();

  constructor() {
    super();
  }

  public inputChangeHandler(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.inputChange.emit(target.value);
  }

  public blurHandler(): void {
    this.blurChange.emit();
  }
}
