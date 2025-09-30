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

import { ModalService } from '@shared/services/modal.service';
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
  readonly categories = input.required<Category[]>();
  readonly measurementUnits = input.required<MeasurementUnits[]>();
  readonly loading = input.required<boolean>();

  readonly save = output<CreateProduct>();
  readonly closeModal = output();

  readonly productModalPresenter = inject(ProductModalPresenter);

  private readonly _modalService = inject(ModalService);

  @ViewChild('firstInput')
  private readonly firstInput!: ElementRef<HTMLInputElement>;

  ngOnChanges(changes: SimpleChanges): void {
    const loading = changes['loading'];

    if (!loading) return;

    console.log(loading);

    if (loading.currentValue) {
      this.productModalPresenter.form.disable();
      return;
    }

    this.productModalPresenter.form.enable();
  }

  ngAfterViewInit(): void {
    this.firstInput.nativeElement.focus();
  }

  closeModalHandler() {
    this._modalService.close();
  }

  saveHandler() {
    this.save.emit(this.productModalPresenter.form.value);
  }
}
