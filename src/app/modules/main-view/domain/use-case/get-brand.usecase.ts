import { Brand } from '@main-view/domain/model/brand.model';
import { BrandPort } from '@main-view/domain/port/brand.port';

export class GetBrandUseCase {
  constructor(private readonly _brandPort: BrandPort) {}

  execute(): Promise<Brand[]> {
    return this._brandPort.getAll();
  }
}
