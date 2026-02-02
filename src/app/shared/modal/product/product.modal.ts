import { Component, inject, signal } from '@angular/core';

import { ModalService } from '@shared/services';

import { CategoryService } from '@category/application/category.service';
import { Category } from '@category/domain/model/category.model';
import { MeasurementUnitsService } from '@modules/measurement-units/application/measurement-units.service';
import { MeasurementUnits } from '@measurement-units/domain/model/measurement-units.model';
import { ProductService } from '@modules/product/application/product.service';
import { CreateProduct } from '@product/domain/model/product.model';
import { ProductModalUi } from './product.modal.ui';

@Component({
  selector: 'rp-product-modal',
  imports: [ProductModalUi],
  template: `<rp-product-modal-ui
    [measurementUnits]="measurementUnits()"
    [categories]="categories()"
    [loading]="loading()"
    (save)="saveHandler($event)"
    (closeModal)="closeModalHandler()" />`,
})
export class ProductModalComponent {
  public readonly categories = signal<Category[]>([]);
  public readonly measurementUnits = signal<MeasurementUnits[]>([]);
  public readonly loading = signal<boolean>(false);

  private readonly _modalSrv = inject(ModalService);
  private readonly _productSrv = inject(ProductService);
  private readonly _categorySrv = inject(CategoryService);
  private readonly _measurementUnitsSrv = inject(MeasurementUnitsService);

  constructor() {
    this._getCategories();
    this._getMeasurementUnits();
  }

  public async saveHandler(product: CreateProduct) {
    this.loading.set(true);
    await this._productSrv.create(product);
    this.closeModalHandler();
  }

  public closeModalHandler() {
    this._modalSrv.close();
  }

  private async _getCategories() {
    const categories = await this._categorySrv.list();
    this.categories.set(categories);
  }

  private async _getMeasurementUnits() {
    const measurementUnits = await this._measurementUnitsSrv.list();
    this.measurementUnits.set(measurementUnits);
  }
}
