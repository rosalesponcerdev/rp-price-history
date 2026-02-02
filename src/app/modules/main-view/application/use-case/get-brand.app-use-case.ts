import { inject, Injectable } from '@angular/core';

import { Brand } from '@main-view/domain/model';
import { BRAND_PORT } from '../providers/token';

@Injectable()
export class GetBrandAppUseCase {
  private readonly _brandPort = inject(BRAND_PORT);

  public execute(): Promise<Brand[]> {
    return this._brandPort.getAll();
  }
}
