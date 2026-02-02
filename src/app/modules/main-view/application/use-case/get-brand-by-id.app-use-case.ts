import { inject, Injectable } from '@angular/core';

import { BRAND_PORT } from '../providers/token';

@Injectable()
export class GetBrandByIdAppUseCase {
  private readonly _brandRepository = inject(BRAND_PORT);

  public execute(id: string) {
    return this._brandRepository.getById(id);
  }
}
