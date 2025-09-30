import { Component, inject, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Category } from '@category/domain/model/category.model';
import { Product } from '@product/domain/model/product.model';

import { ButtonComponent } from '@shared/components/button/button.component';
import { ListFormValue } from '../interface/list.interface';
import { MainViewPresenter } from './main-view.presenter';


@Component({
  selector: 'rp-list-ui',
  templateUrl: './main-view.ui.html',
  imports: [FormsModule, ReactiveFormsModule, ButtonComponent, RouterLink],
  providers: [MainViewPresenter],
})
export class MainViewUiComponent {
  readonly products = input.required<Product[]>();
  readonly categories = input.required<Category[]>();

  readonly searchProduct = output<ListFormValue>();
  readonly openCreateProductModal = output();
  readonly openCreateBrandModal = output();
  readonly clickProduct = output<number>();

  readonly mainViewPrt = inject(MainViewPresenter);

  submitHandler(formValue: unknown) {
    this.searchProduct.emit(formValue as ListFormValue);
  }

  clickProductHandler(productId: number) {
    if (!productId) return;

    this.clickProduct.emit(productId);
  }
}
