import { StoreDto } from '@shared/context/store/infrastructure/dto';

export interface PriceHistoryDto {
  id?: string;
  fecha_registro?: string | null;
  notas?: string | null;
  usuario_registro?: string | null;
  precio: number;
  precio_por_unidad_base?: number;
  presentacion_id: string;
  tienda_id: string;
  tiendas?: Pick<StoreDto, 'id' | 'nombre' | 'direccion'>;
}
