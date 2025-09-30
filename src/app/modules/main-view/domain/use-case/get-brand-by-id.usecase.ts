import { BrandPort } from '@main-view/domain/port/brand.port';

export class GetBrandByIdUseCase {
  constructor(private readonly _brandPort: BrandPort) {}

  public execute(id: string) {
    return this._brandPort.getById(id);
  }
}
