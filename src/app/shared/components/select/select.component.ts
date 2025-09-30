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
  selector: 'rp-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  hostDirectives: [RpValueAccessor],
  template: `<select
    class="block w-full appearance-none rounded-md bg-white pr-8 pl-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    [ngClass]="className()"
    [value]="value()"
    (change)="inputChangeHandler($event)"
    (blur)="blurHandler()">
    <option value="" selected>{{ placeholder() }}</option>

    @for (o of options(); track o.id) {
      <option [value]="o.id">{{ o.text }}</option>
    }
  </select>`,
})
export class RpSelectComponent {
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
