export interface BrandApi {
  id: string;
  nombre: string;
  created_at: string;
}

export type NewBrandApi = Pick<BrandApi, 'nombre'>;
