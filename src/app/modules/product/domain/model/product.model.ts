import { Category, CategoryApi } from '@category/domain/model';

export interface ProductApi {
  id: number;
  nombre: string;
  descripcion: string | null;
  categoria_id: number | null;
  unidad_base_id: number | null;
  created_at: string | null;
  updated_at: string | null;
  categorias?: Partial<CategoryApi>;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  measurementUnitId: number | null;
  categoryId: number | null;
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
