import { Component, inject, input, OnInit, signal } from '@angular/core';

import { ModalService } from '@shared/services';

import { PresentationService } from '@presentation/application';
import { providePresentation } from '@presentation/application/providers';
import { PresentationState } from '@presentation/application/state';
import { Presentation } from '@presentation/domain/model';
import { EditPresentationModalComponent } from '@presentation/ui/modal/edit-presentation/edit-presentation.modal';
import { ProductService } from '@product/application/use-case';
import { Product } from '@product/domain/model';
import { ProductPageUiComponent } from './product.ui';

@Component({
  selector: 'rp-product',
  imports: [ProductPageUiComponent],
  providers: [...providePresentation()],
  template: `<rp-product-ui
    [product]="product()"
    [presentations]="presentationState.presentations$()"
    (openModal)="openModalHandler()" />`,
})
export class ProductPageComponent implements OnInit {
  public readonly productId = input.required<string>();

  public readonly product = signal<Product | undefined>(undefined);
  public readonly presentations = signal<Presentation[]>([]);

  public readonly presentationState = inject(PresentationState);
  private readonly _productSrv = inject(ProductService);
  private readonly _presentationSrv = inject(PresentationService);

  private readonly modalSrv = inject(ModalService);

  public ngOnInit(): void {
    this._getProductById();
    this._getPresentationByProductId();
  }

  public openModalHandler() {
    this.modalSrv.show(EditPresentationModalComponent, {
      product: this.product(),
    });
  }

  private async _getProductById() {
    const product = await this._productSrv.getById(this.productId());

    this.product.set(product);
  }

  private async _getPresentationByProductId() {
    this._presentationSrv.getPresentationsByProductId(this.productId());
  }
}
