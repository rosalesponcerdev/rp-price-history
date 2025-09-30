import { Brand } from '@main-view/domain/model/brand.model';
import { MeasurementUnits } from '@measurement-units/domain/model/measurement-units.model';
import { Product } from '@product/domain/model';

export interface Presentation {
  id: string;
  productId: number;
  product?: Product;
  brandId: number;
  brand?: Brand;
  unitOfMeasureId: number;
  unitOfMeasure?: MeasurementUnits;
  barcode: string | null;
  createdAt: string | null;
  additionalDescription: string | null;
  updatedAt: string | null;
  quantity: number;
  presentationName: string;
}

export interface CreatePresentation
  extends Omit<
    Presentation,
    'id' | 'barcode' | 'createdAt' | 'additionalDescription' | 'updatedAt'
  > {
  barcode?: string | null;
  additionalDescription?: string | null;
}
