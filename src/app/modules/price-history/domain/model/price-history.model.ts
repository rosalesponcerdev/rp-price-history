import { Store } from '@shared/context/store/domain/model';

export interface PriceHistory {
  id: string;
  presentation_id: string;
  store_id: string;
  registration_date?: string;
  notes?: string;
  price: number;
  price_per_base_unit?: number;
  registered_by?: string;
  store?: Pick<Store, 'id' | 'name' | 'direction'>;
}

export interface CreatePriceHistory {
  id?: string;
  presentation_id: string;
  store_id: string;
  notes?: string | null;
  price: number;
  registered_by?: string | null;
  price_per_base_unit?: number;
}
