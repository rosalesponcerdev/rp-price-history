import { Component, inject, signal } from '@angular/core';

import { BrandService } from '@modules/main-view/application/brand.service';
import { Brand, NewBrand } from '@main-view/domain/model';
import { ModalService } from '@shared/services';
import { BrandUiComponent } from './brand.ui';

@Component({
  selector: 'rp-brand-modal',
  imports: [BrandUiComponent],
  template: `<rp-brand-modal-ui
    [brands]="brands()"
    [loading]="loading()"
    (save)="saveHandler($event)"
    (closeModal)="closeModalHandler()" />`,
})
export class BrandModalComponent {
  public readonly brands = signal<Brand[]>([]);
  public readonly loading = signal<boolean>(false);

  private readonly _brandSrv = inject(BrandService);
  private readonly _modalSrv = inject(ModalService);

  constructor() {
    this._getBrands();
  }

  public async saveHandler(newBrand: NewBrand) {
    this.loading.set(true);

    await this._brandSrv.create(newBrand);

    this.closeModalHandler();
  }

  public closeModalHandler() {
    this._modalSrv.close();
  }

  private async _getBrands() {
    const brands = await this._brandSrv.getAll();

    this.brands.set(brands);
  }
}
