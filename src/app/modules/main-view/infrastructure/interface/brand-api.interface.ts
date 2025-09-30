export interface BrandApi {
  id: number;
  nombre: string;
  created_at: string;
}

export type NewBrandApi = Pick<BrandApi, 'nombre'>;
