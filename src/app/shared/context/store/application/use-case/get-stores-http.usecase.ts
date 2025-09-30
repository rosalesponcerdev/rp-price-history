import { inject, Injectable } from '@angular/core';

import { GetStoresUseCase } from '@shared/context/store/domain/use-case';
import { STORE_HTTP_REPOSITORY } from '@shared/context/store/infrastructure/repository';
import { Store } from '@shared/context/store/domain/model';

@Injectable()
export class GetStoresHttpApplicationUseCase {
  private readonly _getStoresUseCase: GetStoresUseCase;
  private readonly _httpRepository = inject(STORE_HTTP_REPOSITORY);

  constructor() {
    this._getStoresUseCase = new GetStoresUseCase(this._httpRepository);
  }

  public execute(): Promise<Store[]> {
    return this._getStoresUseCase.execute();
  }
}
