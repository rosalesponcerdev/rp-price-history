import { BrandPort } from '@main-view/domain/port/brand.port';

export class GetBrandByIdUseCase {
  public constructor(private readonly _brandPort: BrandPort) {}

  execute(id: string) {
    return this._brandPort.getById(id);
  }
}
