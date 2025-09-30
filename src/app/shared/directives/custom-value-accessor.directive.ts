import {
  Directive,
  forwardRef,
  HostBinding,
  HostListener,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[rpValueAccessor]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RpValueAccessor),
      multi: true,
    },
  ],
})
export class RpValueAccessor implements ControlValueAccessor {
  @HostBinding('value')
  public readonly value = signal<string>('');

  @HostBinding('disabled')
  public readonly disabled = signal<boolean>(false);

  @HostListener('inputChange', ['$event'])
  public inputChange(value: string) {
    this.value.set(value);
    this.onChange(value);
  }

  @HostListener('blurChange')
  public blurChange() {
    this.onTouched();
  }

  public writeValue(newValue: string): void {
    this.value.set(newValue);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  private onChange = (value: string) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched = () => {};
}
