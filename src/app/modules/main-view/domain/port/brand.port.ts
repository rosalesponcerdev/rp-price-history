import { Brand, NewBrand } from '@main-view/domain/model/brand.model';

export interface BrandPort {
  getAll(): Promise<Brand[]>;
  create(newBrand: NewBrand): Promise<Brand>;
  getById(id: string): Promise<Brand>;
}
