import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'rp-button',
  imports: [NgClass],
  styleUrl: './button.component.css',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly loading = input(false);
  readonly disabled = input(false);
  readonly className = input('');
  readonly type = input<'submit' | 'reset' | 'button' | ''>('');
  readonly outline = input<boolean>(false);

  readonly classNameObject = computed(() => {
    const className = this.className();

    const isOutline = this.outline();

    const classObj: Record<string, boolean> = {
      'text-sm text-white  rounded-md shadow-xs': !isOutline,
      'text-sm/6 text-gray-900 cursor-pointer': isOutline,
    };

    if (className) classObj[className] = !!className;

    return classObj;
  });

  readonly clicked = output();

  readonly disableButton = computed(() => this.disabled() || this.loading());
}
