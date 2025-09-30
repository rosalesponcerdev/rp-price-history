import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './shared/components/modal/modal.component';

@Component({
  selector: 'rp-root',
  imports: [RouterOutlet, ModalComponent],
  providers: [],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'rp-price-history';
}
