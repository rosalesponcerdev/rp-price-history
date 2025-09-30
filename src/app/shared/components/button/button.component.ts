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
  public readonly loading = input(false);
  public readonly disabled = input(false);
  public readonly className = input('');
  public readonly type = input<'submit' | 'reset' | 'button' | ''>('');
  public readonly outline = input<boolean>(false);

  public readonly classNameObject = computed(() => {
    const className = this.className();

    const isOutline = this.outline();

    const classObj: Record<string, boolean> = {
      'text-sm text-white  rounded-md shadow-xs': !isOutline,
      'text-sm/6 text-gray-900 cursor-pointer': isOutline,
    };

    if (className) classObj[className] = !!className;

    return classObj;
  });

  public readonly clicked = output();

  public readonly disableButton = computed(
    () => this.disabled() || this.loading()
  );
}
