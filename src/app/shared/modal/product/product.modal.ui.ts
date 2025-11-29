import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  OnChanges,
  output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ProductModalPresenter } from './product.presenter';

import { ModalService } from '@shared/services';
import { CreateProduct } from '@product/domain/model/product.model';
import { Category } from '@category/domain/model/category.model';
import { MeasurementUnits } from '@measurement-units/domain/model/measurement-units.model';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'rp-product-modal-ui',
  templateUrl: './product.modal.ui.html',
  providers: [ProductModalPresenter],
  imports: [FormsModule, ReactiveFormsModule, ButtonComponent],
})
export class ProductModalUi implements AfterViewInit, OnChanges {
  public readonly categories = input.required<Category[]>();
  public readonly measurementUnits = input.required<MeasurementUnits[]>();
  public readonly loading = input.required<boolean>();

  public readonly save = output<CreateProduct>();
  public readonly closeModal = output();

  public readonly productModalPresenter = inject(ProductModalPresenter);

  private readonly _modalService = inject(ModalService);

  @ViewChild('firstInput')
  private readonly firstInput!: ElementRef<HTMLInputElement>;

  public ngOnChanges(changes: SimpleChanges): void {
    const loading = changes['loading'];

    if (!loading) return;

    if (loading.currentValue) {
      this.productModalPresenter.form.disable();
      return;
    }

    this.productModalPresenter.form.enable();
  }

  public ngAfterViewInit(): void {
    this.firstInput.nativeElement.focus();
  }

  public closeModalHandler() {
    this._modalService.close();
  }

  public saveHandler() {
    this.save.emit(this.productModalPresenter.form.value);
  }
}
