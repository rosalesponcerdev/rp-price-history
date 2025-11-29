export interface CategoryApi {
  created_at: string | null;
  descripcion: string | null;
  id: string;
  nombre: string;
}

export interface Category {
  id: string;
  createdAt: string | null;
  description: string | null;
  name: string;
}
