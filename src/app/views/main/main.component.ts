import { Component } from '@angular/core';
import { AddItemComponent } from '../../component/add-item/add-item.component';

@Component({
  standalone: true,
  selector: 'rp-main',
  imports: [AddItemComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
