import { Brand } from '@main-view/domain/model/brand.model';
import { BrandPort } from '@main-view/domain/port/brand.port';

export class GetBrandUseCase {
  constructor(private readonly _brandPort: BrandPort) {}

  public execute(): Promise<Brand[]> {
    return this._brandPort.getAll();
  }
}
