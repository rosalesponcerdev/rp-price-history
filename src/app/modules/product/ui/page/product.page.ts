import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';

import { ModalService } from '@shared/services/modal.service';

import { PresentationService } from '@presentation/application';
import { providePresentation } from '@presentation/application/providers';
import { PresentationState } from '@presentation/application/state';
import { Presentation } from '@presentation/domain/model';
import { ProductService } from '@product/application/use-case';
import { Product } from '@product/domain/model';
import { ProductPageUiComponent } from './product.ui';

@Component({
  selector: 'rp-product',
  imports: [ProductPageUiComponent],
  providers: [ModalService, ...providePresentation()],
  template: `<rp-product-ui
    [product]="product()"
    [presentations]="presentationState.presentations$()" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent implements OnInit {
  readonly productId = input.required<string>();

  readonly product = signal<Product | undefined>(undefined);
  readonly presentations = signal<Presentation[]>([]);

  public readonly presentationState = inject(PresentationState);
  private readonly _productSrv = inject(ProductService);
  private readonly _presentationSrv = inject(PresentationService);

  ngOnInit(): void {
    this._getProductById();
    this._getPresentationByProductId();
  }

  private async _getProductById() {
    const product = await this._productSrv.getById(this.productId());

    this.product.set(product);
  }

  private async _getPresentationByProductId() {
    this._presentationSrv.getPresentationsByProductId(+this.productId());
  }
}
