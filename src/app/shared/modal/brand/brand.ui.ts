import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '@shared/components/button/button.component';
import { Brand, NewBrand } from '@main-view/domain/model/brand.model';

import { BrandModalPresenter } from './brand.presenter';

@Component({
  selector: 'rp-brand-modal-ui',
  templateUrl: './brand.ui.html',
  imports: [ButtonComponent, ReactiveFormsModule, FormsModule],
  providers: [BrandModalPresenter],
})
export class BrandUiComponent implements AfterViewInit {
  readonly brands = input.required<Brand[]>();
  readonly loading = input.required<boolean>();

  readonly save = output<NewBrand>();
  readonly closeModal = output();

  readonly brandModalPresenter = inject(BrandModalPresenter);

  @ViewChild('firstInput')
  private readonly firstInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    this.firstInput.nativeElement.focus();
  }

  closeModalHandler() {
    this.closeModal.emit();
  }

  saveHandler() {
    this.save.emit(this.brandModalPresenter.form.value as NewBrand);
  }
}
