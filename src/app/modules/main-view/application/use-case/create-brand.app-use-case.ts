import { inject, Injectable } from '@angular/core';
import { Brand, NewBrand } from '@main-view/domain/model';
import { BRAND_PORT } from '../providers/token';

@Injectable()
export class CreateBrandAppUseCase {
  private readonly _brandRepository = inject(BRAND_PORT);

  public async execute(newBrand: NewBrand): Promise<Brand> {
    return this._brandRepository.create(newBrand);
  }
}
