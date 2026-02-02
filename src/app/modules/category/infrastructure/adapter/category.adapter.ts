import { Category } from '@category/domain/model';
import { CategoryDto } from '@category/infrastructure/dto';

export class CategoryAdapter {
  public static from(category: CategoryDto): Category {
    return {
      id: category.id,
      createdAt: category.created_at,
      name: category.nombre,
      description: category.descripcion,
    };
  }

  public static fromPartial(category: Partial<CategoryDto>): Partial<Category> {
    const tempCategory: Partial<Category> = {};

    if (category.id !== undefined) tempCategory.id = category.id;
    if (category.created_at) tempCategory.createdAt = category.created_at;
    if (category.nombre) tempCategory.name = category.nombre;
    if (category.descripcion) tempCategory.description = category.descripcion;

    return tempCategory;
  }

  public static to(category: Category): CategoryDto {
    return {
      id: category.id,
      created_at: category.createdAt,
      nombre: category.name,
      descripcion: category.description,
    };
  }
}
