import { Item } from '@shared/interface';
import {
  BrandApi,
  NewBrandApi,
} from '@main-view/infrastructure/interface/brand-api.interface';
import { Brand, NewBrand } from '@main-view/domain/model/brand.model';

export class BrandTransformer {
  static from(brand: BrandApi): Brand {
    return {
      id: `${brand.id}`,
      name: brand.nombre,
      created_at: brand.created_at,
    };
  }

  static saveTo(brand: NewBrand): NewBrandApi {
    return {
      nombre: brand.name,
    };
  }

  static toItemArray(brands: Brand[]): Item[] {
    return brands.map(b => this.toItem(b));
  }

  static toItem(brand: Brand): Item {
    return {
      id: brand.id,
      text: brand.name,
    };
  }
}
