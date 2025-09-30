import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { RpValueAccessor } from '@shared/directives';

@Component({
  selector: 'rp-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  hostDirectives: [RpValueAccessor],
  template: `<input
    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    [ngClass]="className()"
    [autocomplete]="autocomplete()"
    [type]="type()"
    [placeholder]="placeholder()"
    (input)="inputChangeHandler($event)"
    (blur)="blurHandler()" />`,
})
export class RpInputComponent {
  public readonly type = input<string>('text');
  public readonly placeholder = input<string>('');
  public readonly autocomplete = input<AutoFill>('off');
  public readonly className = input<string>('');
  public readonly inputChange = output<string>();
  public readonly blurChange = output();

  public readonly value = signal<string>('');
  public readonly disabled = signal<boolean>(false);

  public inputChangeHandler(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.inputChange.emit(target.value);
  }

  public blurHandler(): void {
    this.blurChange.emit();
  }
}
