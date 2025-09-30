import { CategoryApi, Category } from '../../domain/model/category.model';

export class CategoryTransformer {
  static from(category: CategoryApi): Category {
    return {
      id: category.id,
      createdAt: category.created_at,
      name: category.nombre,
      description: category.descripcion,
    };
  }

  static fromPartial(category: Partial<CategoryApi>): Partial<Category> {
    const tempCategory: Partial<Category> = {};

    if (category.id !== undefined) tempCategory.id = category.id;
    if (category.created_at) tempCategory.createdAt = category.created_at;
    if (category.nombre) tempCategory.name = category.nombre;
    if (category.descripcion) tempCategory.description = category.descripcion;

    return tempCategory;
  }

  static to(category: Category): CategoryApi {
    return {
      id: category.id,
      created_at: category.createdAt,
      nombre: category.name,
      descripcion: category.description,
    };
  }
}
