import { Component, inject, OnInit, signal } from '@angular/core';

import { StoreState } from '@shared/context/store/application/state';
import { StoreService } from '@shared/context/store/application/store.service';
import { ModalService } from '@shared/services/modal.service';

import { Presentation } from '@presentation/domain/model';
import { PriceHistoryApplicationMapper } from '@price-history/application/mapper';
import { PriceHistoryService } from '@price-history/application/price-history.service';
import { EditPriceHistoryFormValue } from './edit-price-history.presenter';
import { EditPriceHistoryModalUi } from './edit-price-history.ui';

@Component({
  selector: 'rp-edit-price-history-modal',
  imports: [EditPriceHistoryModalUi],
  template: `<rp-edit-price-history-modal-ui
    [stores]="storeState.stores$()"
    [presentation]="presentation()"
    [loading]="loading()"
    (cancelModal)="cancelModelHandler()"
    (save)="saveHandler($event)" />`,
})
export class EditPriceHistoryModalComponent implements OnInit {
  public readonly data?: {
    presentation?: Presentation;
  } = {};

  public readonly presentation = signal<Presentation | undefined>(undefined);
  public readonly loading = signal<boolean>(false);

  public readonly storeState = inject(StoreState);
  private readonly _modalSrv = inject(ModalService);
  private readonly _storeSrv = inject(StoreService);
  private readonly _priceHistorySrv = inject(PriceHistoryService);

  public ngOnInit(): void {
    this._getStores();

    this.presentation.set(this.data?.presentation);
  }

  public cancelModelHandler() {
    this._modalSrv.close();
  }

  public saveHandler(formValue: EditPriceHistoryFormValue) {
    const presentation = this.presentation();

    if (!presentation) throw new Error('No Presentation allowed');

    const createModel = PriceHistoryApplicationMapper.toCreateModel(formValue);

    this._priceHistorySrv.create(createModel, presentation);
  }

  private _getStores() {
    this._storeSrv.getAll();
  }
}
