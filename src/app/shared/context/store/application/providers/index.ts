import { Provider } from '@angular/core';

import { GetStoresHttpApplicationUseCase } from '@shared/context/store/application/use-case';
import {
  STORE_HTTP_REPOSITORY,
  StoreHttpRepository,
} from '@shared/context/store/infrastructure/repository';
import { ModalService } from '@shared/services';

import { StoreService } from '../store.service';

export function provideStore(): Provider[] {
  return [
    {
      provide: STORE_HTTP_REPOSITORY,
      useClass: StoreHttpRepository,
    },
    GetStoresHttpApplicationUseCase,
    StoreService,
    ModalService,
  ];
}
