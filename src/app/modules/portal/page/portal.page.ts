import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'rp-portal',
  imports: [RouterOutlet],
  template: `<div class="pt-20">
    <router-outlet />
  </div>`,
})
export class PortalPage {}
