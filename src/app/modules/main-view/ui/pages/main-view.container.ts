import { Component, inject, OnInit, signal } from '@angular/core';

import { BrandModalComponent } from '@shared/modal/brand/brand.modal';
import { ProductModalComponent } from '@shared/modal/product/product.modal';
import { ModalService } from '@shared/services/modal.service';

import { CategoryService } from '@category/application/category.service';
import { Category } from '@category/domain/model/category.model';
import { ListFormValue } from '@main-view/ui/interface/list.interface';
import { ProductService } from '@product/application/use-case/product.service';
import { Product } from '@product/domain/model/product.model';
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

  public readonly modalSrv = inject(ModalService);
  private readonly _listProductSrv = inject(ProductService);
  private readonly _listCategorySrv = inject(CategoryService);

  public ngOnInit(): void {
    this._getCategories();
    this._listProducts();
  }

  public async searchProductHandler(formValue: ListFormValue) {
    const products = await this._listProductSrv.getByCriteria(formValue);

    this.products.set(products);
  }

  public openCreateProductModalHandler() {
    this.modalSrv.show(ProductModalComponent).subscribe(res => {
      console.log('openCreateProductModalHandler', res);
    });
  }

  public openCreateBrandModalHandler() {
    this.modalSrv.show(BrandModalComponent).subscribe(res => {
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
