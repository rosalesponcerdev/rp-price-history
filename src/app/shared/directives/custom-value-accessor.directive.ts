import { Component, model } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'rp-base-value-accessor',
  host: {
    '(inputChange)': 'inputChangeRegister($event)',
    '(blurChange)': 'blurChangeRegister()',
  },
  template: '',
})
export class RpBaseValueAccessor implements ControlValueAccessor {
  public readonly value = model<string>('');
  public readonly disabled = model<boolean>(false);

  public inputChangeRegister(value: string) {
    this.value.set(value);
    this.onChange(value);
  }

  public blurChangeRegister() {
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
