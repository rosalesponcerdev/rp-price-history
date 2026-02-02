import { Item } from '@shared/interface';
import {
  BrandApi,
  NewBrandApi,
} from '@main-view/infrastructure/interface/brand-api.interface';
import { Brand, NewBrand } from '@main-view/domain/model';

export class BrandAdapter {
  public static from(brand: BrandApi): Brand {
    return {
      id: `${brand.id}`,
      name: brand.nombre,
      created_at: brand.created_at,
    };
  }

  public static saveTo(brand: NewBrand): NewBrandApi {
    return {
      nombre: brand.name,
    };
  }

  public static toItemArray(brands: Brand[]): Item[] {
    return brands.map(b => this.toItem(b));
  }

  public static toItem(brand: Brand): Item {
    return {
      id: brand.id,
      text: brand.name,
    };
  }
}
