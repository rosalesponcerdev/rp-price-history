import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { ButtonComponent } from '@shared/components/button/button.component';

import { Presentation } from '@presentation/domain/model';
import { PriceHistory } from '@price-history/domain/model';

@Component({
  selector: 'rp-presentation-page-ui',
  templateUrl: './presentation.ui.html',
  imports: [CurrencyPipe, ButtonComponent],
})
export class PresentationPageUiComponent {
  public readonly presentation = input.required<Presentation | undefined>();
  public readonly priceHistoryList = input.required<PriceHistory[]>();

  public readonly addPrice = output();

  public addPriceHandler() {
    this.addPrice.emit();
  }
}
