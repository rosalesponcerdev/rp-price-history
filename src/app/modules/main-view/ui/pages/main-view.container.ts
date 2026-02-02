import { Component, inject, OnInit, signal } from '@angular/core';

import { BrandModalComponent } from '@shared/modal/brand/brand.modal';
import { ProductModalComponent } from '@shared/modal/product/product.modal';
import { ModalService } from '@shared/services';

import { SessionStore } from '@auth/application/store';
import { CategoryService } from '@category/application/category.service';
import { Category } from '@category/domain/model';
import { ListFormValue } from '@main-view/ui/interface';
import { ProductService } from '@modules/product/application/product.service';
import { Product } from '@product/domain/model';
import { MainViewUiComponent } from './main-view.ui';

@Component({
  selector: 'rp-list',
  imports: [MainViewUiComponent],
  template: `<rp-list-ui
    [products]="products()"
    [categories]="categories()"
    (openCreateProductModal)="openCreateProductModalHandler()"
    (openCreateBrandModal)="openCreateBrandModalHandler()"
    (searchProduct)="searchProductHandler($event)" />`,
})
export class MainViewContainerComponent implements OnInit {
  public readonly products = signal<Product[]>([]);
  public readonly categories = signal<Category[]>([]);

  private readonly _modalSrv = inject(ModalService);
  private readonly _listProductSrv = inject(ProductService);
  private readonly _listCategorySrv = inject(CategoryService);
  private readonly _sessionStore = inject(SessionStore);

  public ngOnInit(): void {
    this._getCategories();
    this._listProducts();
  }

  public async searchProductHandler(formValue: ListFormValue) {
    const products = await this._listProductSrv.getByCriteria(formValue);

    this.products.set(products);
  }

  public openCreateProductModalHandler() {
    this._modalSrv.show(ProductModalComponent).subscribe(res => {
      console.log('openCreateProductModalHandler', res);
    });
  }

  public openCreateBrandModalHandler() {
    this._modalSrv.show(BrandModalComponent).subscribe(res => {
      console.log('openCreateBrandModalHandler', res);
    });
  }

  private async _listProducts() {
    const products = await this._listProductSrv.list();

    this.products.set(products);
  }

  private async _getCategories() {
    const categories = await this._listCategorySrv.list();

    this.categories.set(categories);
  }
}
