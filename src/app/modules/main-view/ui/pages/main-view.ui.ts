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
  public readonly products = input.required<Product[]>();
  public readonly categories = input.required<Category[]>();

  public readonly searchProduct = output<ListFormValue>();
  public readonly openCreateProductModal = output();
  public readonly openCreateBrandModal = output();
  public readonly clickProduct = output<number>();

  public readonly mainViewPrt = inject(MainViewPresenter);

  public submitHandler(formValue: unknown) {
    this.searchProduct.emit(formValue as ListFormValue);
  }

  public clickProductHandler(productId: number) {
    if (!productId) return;

    this.clickProduct.emit(productId);
  }
}
