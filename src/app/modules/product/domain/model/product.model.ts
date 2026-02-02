import { Category } from '@category/domain/model';
import { CategoryDto } from '@category/infrastructure/dto';

export interface ProductApi {
  id: string;
  nombre: string;
  descripcion: string | null;
  categoria_id: string | null;
  unidad_base_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  categorias?: Partial<CategoryDto>;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  measurementUnitId: string | null;
  categoryId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  category?: Partial<Category>;
}

export type CreateProduct = Pick<
  Product,
  'name' | 'description' | 'categoryId' | 'measurementUnitId'
>;

export type CreateProductApi = Pick<
  ProductApi,
  'nombre' | 'descripcion' | 'categoria_id' | 'unidad_base_id'
>;
