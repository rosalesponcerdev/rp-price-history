import { Provider } from '@angular/core';

import { GetStoresHttpApplicationUseCase } from '@shared/context/store/application/use-case';
import { StoreLocalRepository } from '@shared/context/store/infrastructure/repository';
import { ModalService } from '@shared/services';

import { StoreService } from '../store.service';
import { STORE_HTTP_REPOSITORY } from './token';

export function provideStore(): Provider[] {
  return [
    {
      provide: STORE_HTTP_REPOSITORY,
      // useClass: StoreHttpRepository,
      useClass: StoreLocalRepository,
    },
    GetStoresHttpApplicationUseCase,
    StoreService,
    ModalService,
  ];
}
