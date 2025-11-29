import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '@shared/components/button/button.component';

import { Presentation } from '@presentation/domain/model';
import { Product } from '@product/domain/model';

@Component({
  selector: 'rp-product-ui',
  templateUrl: './product.ui.html',
  imports: [RouterLink, ButtonComponent],
})
export class ProductPageUiComponent {
  public readonly product = input.required<Product | undefined>();
  public readonly presentations = input<Presentation[]>([]);

  public readonly openModal = output();

  public openModalHandler() {
    this.openModal.emit();
  }
}
