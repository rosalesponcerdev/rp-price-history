export interface CategoryApi {
  created_at: string | null;
  descripcion: string | null;
  id: number;
  nombre: string;
}

export interface Category {
  id: number;
  createdAt: string | null;
  description: string | null;
  name: string;
}
