import { BrandPort } from '@main-view/domain/port/brand.port';
import { Brand, NewBrand } from '@main-view/domain/model/brand.model';

export class CreateBrandUseCase {
  constructor(private _brandPort: BrandPort) {}

  async execute(newBrand: NewBrand): Promise<Brand> {
    return this._brandPort.create(newBrand);
  }
}
