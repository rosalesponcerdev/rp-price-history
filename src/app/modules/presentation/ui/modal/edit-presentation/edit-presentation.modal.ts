import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';

import { ModalService } from '@shared/services';

import { BrandService } from '@modules/main-view/application/brand.service';
import { Brand } from '@main-view/domain/model';

import { MeasurementUnitsService } from '@modules/measurement-units/application/measurement-units.service';
import { MeasurementUnits } from '@measurement-units/domain/model/measurement-units.model';
import { PresentationService } from '@presentation/application';
import { CreatePresentation } from '@presentation/domain/model';
import { Product } from '@product/domain/model';
import { EditPresentationModalUi } from './edit-presentation.ui';

@Component({
  selector: 'rp-edit-presentation',
  imports: [EditPresentationModalUi],
  template: `<rp-edit-presentation-ui
    [brands]="brands()"
    [measurementUnits]="measurementUnits()"
    [product]="product()"
    [loading]="loading()"
    (save)="saveHandler($event)"
    (cancelModal)="cancelModalHandler()" />`,
})
export class EditPresentationModalComponent implements OnInit {
  public readonly brands = signal<Brand[]>([]);
  public readonly measurementUnits = signal<MeasurementUnits[]>([]);
  public readonly product = signal<Product | undefined>(undefined);
  public readonly loading: Signal<boolean>;

  private readonly data?: { product?: Product } = {};

  private readonly _brandSrv = inject(BrandService);
  private readonly _measurementUnitsSrv = inject(MeasurementUnitsService);
  private readonly _presentationSrv = inject(PresentationService);
  private readonly _modalSrv = inject(ModalService);

  constructor() {
    this.loading = computed(() => {
      return this._presentationSrv.loading$().create;
    });
  }

  public ngOnInit(): void {
    this._setProduct();
    this._getBrands();
    this._getMeasurementUnits();
  }

  public async saveHandler(createPresentation: CreatePresentation) {
    try {
      await this._presentationSrv.create(createPresentation);
      this._modalSrv.close();
    } catch (error) {
      console.warn((error as { message: string }).message);
    }
  }

  public async cancelModalHandler() {
    this._modalSrv.close();
  }

  private async _getBrands() {
    const brands = await this._brandSrv.getAll();

    this.brands.set(brands);
  }

  private async _getMeasurementUnits() {
    const measurementUnits = await this._measurementUnitsSrv.list();

    this.measurementUnits.set(measurementUnits);
  }

  private _setProduct() {
    this.product.set(this.data?.product);
  }
}
