import { Brand } from '@main-view/domain/model';
import { MeasurementUnits } from '@measurement-units/domain/model/measurement-units.model';
import { Product } from '@product/domain/model';

export interface Presentation {
  id: string;
  productId: string;
  product?: Product;
  brandId: string;
  brand?: Brand;
  unitOfMeasureId: string;
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
