import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'rp-root',
  imports: [RouterOutlet],
  providers: [],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public title = 'rp-price-history';
}
