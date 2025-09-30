export interface Brand {
  id: string;
  name: string;
  created_at: string;
}

export type NewBrand = Pick<Brand, 'name'>;
