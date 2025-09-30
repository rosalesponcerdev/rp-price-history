import { inject } from '@angular/core';

import {
  CreateProduct,
  CreateProductApi,
  Product,
  ProductApi,
} from '@product/domain/model/product.model';
import { CategoryTransformer } from '@category/infrastructure/transformer/category.transformer';

export class ProductTransformer {
  private readonly _categoryTransformer = inject(CategoryTransformer);

  static from(product: ProductApi): Product {
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
      tempProduct.category = CategoryTransformer.fromPartial(categoria);
    }

    return tempProduct;
  }

  static to(product: Product): ProductApi {
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

  static createTo(newProduct: CreateProduct): CreateProductApi {
    return {
      categoria_id: newProduct.categoryId,
      descripcion: newProduct.description,
      nombre: newProduct.name,
      unidad_base_id: newProduct.measurementUnitId,
    };
  }
}
