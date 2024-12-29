import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'rp-button',
  standalone: true,
  imports: [NgClass],
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() loading = false;
  @Input() disabled = false;
  @Input() className = '';
  @Input() type = '';
}
