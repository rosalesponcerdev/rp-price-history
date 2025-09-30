import { StoreDto } from '@shared/context/store/infrastructure/dto';

export interface PriceHistoryDto {
  id?: number;
  fecha_registro?: string | null;
  notas?: string | null;
  usuario_registro?: string | null;
  precio: number;
  precio_por_unidad_base?: number;
  presentacion_id: number;
  tienda_id: number;
  tiendas?: Pick<StoreDto, 'id' | 'nombre' | 'direccion'>;
}
