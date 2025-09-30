import { Brand, NewBrand } from '@main-view/domain/model/brand.model';
import { BrandPort } from '@main-view/domain/port/brand.port';

export class CreateBrandUseCase {
  constructor(private readonly _brandPort: BrandPort) {}

  public async execute(newBrand: NewBrand): Promise<Brand> {
    return this._brandPort.create(newBrand);
  }
}
