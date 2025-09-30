import { Component, inject, input } from '@angular/core';

import { ButtonComponent } from '@shared/components/button/button.component';
import { ModalService } from '@shared/services/modal.service';

import { Presentation } from '@presentation/domain/model';
import { EditPresentationModalComponent } from '@presentation/ui/modal/edit-presentation/edit-presentation.modal';
import { Product } from '@product/domain/model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'rp-product-ui',
  templateUrl: './product.ui.html',
  imports: [RouterLink, ButtonComponent],
})
export class ProductPageUiComponent {
  public readonly product = input.required<Product | undefined>();
  public readonly presentations = input<Presentation[]>([]);

  private readonly modalSrv = inject(ModalService);

  public clickHandler() {
    this.modalSrv.show(EditPresentationModalComponent, {
      product: this.product(),
    });
  }
}
