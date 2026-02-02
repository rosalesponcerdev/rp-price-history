import { CategoryAdapter } from '@modules/category/infrastructure/adapter/category.adapter';
import {
  CreateProduct,
  CreateProductApi,
  Product,
  ProductApi,
} from '@product/domain/model/product.model';

export class ProductTransformer {
  public static from(product: ProductApi): Product {
    const tempProduct: Product = {
      id: product.id,
      name: product.nombre,
      description: product.descripcion,
      categoryId: product.categoria_id,
      measurementUnitId: product.unidad_base_id,
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    };

    const { categorias: categoria } = product;

    if (categoria) {
      tempProduct.category = CategoryAdapter.fromPartial(categoria);
    }

    return tempProduct;
  }

  public static to(product: Product): ProductApi {
    return {
      id: product.id,
      nombre: product.name,
      descripcion: product.description,
      categoria_id: product.categoryId,
      unidad_base_id: product.measurementUnitId,
      created_at: product.createdAt,
      updated_at: product.updatedAt,
    };
  }

  public static createTo(newProduct: CreateProduct): CreateProductApi {
    return {
      categoria_id: newProduct.categoryId,
      descripcion: newProduct.description,
      nombre: newProduct.name,
      unidad_base_id: newProduct.measurementUnitId,
    };
  }
}
