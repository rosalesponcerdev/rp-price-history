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

import { Brand, NewBrand } from '@main-view/domain/model';
import { BrandModalPresenter } from './brand.presenter';

@Component({
  selector: 'rp-brand-modal-ui',
  templateUrl: './brand.ui.html',
  imports: [ButtonComponent, ReactiveFormsModule, FormsModule],
  providers: [BrandModalPresenter],
})
export class BrandUiComponent implements AfterViewInit {
  public readonly brands = input.required<Brand[]>();
  public readonly loading = input.required<boolean>();

  public readonly save = output<NewBrand>();
  public readonly closeModal = output();

  public readonly brandModalPresenter = inject(BrandModalPresenter);

  @ViewChild('firstInput')
  private readonly firstInput!: ElementRef<HTMLInputElement>;

  public ngAfterViewInit(): void {
    this.firstInput.nativeElement.focus();
  }

  public closeModalHandler() {
    this.closeModal.emit();
  }

  public saveHandler() {
    this.save.emit(this.brandModalPresenter.form.value as NewBrand);
  }
}
