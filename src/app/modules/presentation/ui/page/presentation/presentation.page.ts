import { Component, inject, input, OnInit } from '@angular/core';

import { provideStore } from '@shared/context/store/application/providers';
import { ModalService } from '@shared/services';
import { PriceHistoryState } from '@shared/state';

import { PresentationService } from '@presentation/application';
import { providePresentation } from '@presentation/application/providers';
import { PresentationState } from '@presentation/application/state';
import { PriceHistoryService } from '@price-history/application/price-history.service';
import { providePriceHistory } from '@price-history/application/providers';
import { EditPriceHistoryModalComponent } from '@price-history/ui/modal/edit-price-history.modal';
import { PresentationPageUiComponent } from './presentation.ui';

@Component({
  selector: 'rp-presentation-page',
  providers: [
    PriceHistoryState,
    ...providePresentation(),
    ...provideStore(),
    ...providePriceHistory(),
  ],
  imports: [PresentationPageUiComponent],
  template: `<rp-presentation-page-ui
    [priceHistoryList]="priceHistoryState.list$()"
    [presentation]="presentationState.currentPresentation$()"
    (addPrice)="addPriceHandler()" />`,
})
export class PresentationPage implements OnInit {
  public readonly presentationId = input.required<string>();

  public readonly priceHistoryState = inject(PriceHistoryState);
  public readonly presentationState = inject(PresentationState);
  private readonly _presentationSrv = inject(PresentationService);
  private readonly _priceHistorySrv = inject(PriceHistoryService);
  private readonly _modalSrv = inject(ModalService);

  public ngOnInit(): void {
    this._presentationSrv.getPresentationById(this.presentationId());
    this._priceHistorySrv.getByPresentationId(this.presentationId());
  }

  public addPriceHandler() {
    this._modalSrv.show(EditPriceHistoryModalComponent, {
      presentation: this.presentationState.currentPresentation,
    });
  }
}
