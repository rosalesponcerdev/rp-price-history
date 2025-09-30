import { BrandApi } from '@main-view/infrastructure/interface/brand-api.interface';
import { UnidadesMedida } from '@measurement-units/domain/model/measurement-units.model';
import { ProductApi } from '@product/domain/model';

export interface PresentationDto {
  id: number;
  marca_id: number;
  marcas?: BrandApi;
  producto_id: number;
  productos?: ProductApi;
  unidad_medida_id: number;
  unidades_medida?: UnidadesMedida;
  cantidad: number;
  codigo_barras: string | null;
  created_at: string | null;
  descripcion_adicional: string | null;
  nombre_presentacion: string;
  updated_at: string | null;
}

export interface CreatePresentationDto
  extends Omit<
    PresentationDto,
    | 'created_at'
    | 'codigo_barras'
    | 'descripcion_adicional'
    | 'id'
    | 'updated_at'
  > {
  codigo_barras?: string | null;
  descripcion_adicional?: string | null;
}
