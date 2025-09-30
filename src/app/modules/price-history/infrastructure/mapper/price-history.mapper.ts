import { CreatePriceHistory, PriceHistory } from '@price-history/domain/model';

import { StoreMapper } from '@shared/context/store/infrastructure/mapper';

import { PriceHistoryDto } from '../dto';

export class PriceHistoryMapper {
  static fromArray(priceHistoryDtoList: PriceHistoryDto[]): PriceHistory[] {
    return priceHistoryDtoList.map(p => PriceHistoryMapper.from(p));
  }

  static from(priceHistoryDto: PriceHistoryDto): PriceHistory {
    const priceHistory: PriceHistory = {
      id: `${priceHistoryDto.id}`,
      presentation_id: priceHistoryDto.presentacion_id,
      price: priceHistoryDto.precio,
      price_per_base_unit: priceHistoryDto.precio_por_unidad_base,
      store_id: priceHistoryDto.tienda_id,
    };

    if (priceHistoryDto.tiendas)
      priceHistory.store = StoreMapper.from(priceHistoryDto.tiendas);

    if (priceHistoryDto.notas) priceHistory.notes = priceHistoryDto.notas;

    if (priceHistoryDto.usuario_registro)
      priceHistory.registered_by = priceHistoryDto.usuario_registro;

    if (priceHistoryDto.fecha_registro)
      priceHistory.registration_date = priceHistoryDto.fecha_registro;

    return priceHistory;
  }

  static toCreate(createPriceHistory: CreatePriceHistory): PriceHistoryDto {
    const priceHistoryDto: PriceHistoryDto = {
      precio: createPriceHistory.price,
      presentacion_id: Number(createPriceHistory.presentation_id),
      tienda_id: Number(createPriceHistory.store_id),
      precio_por_unidad_base: createPriceHistory.price_per_base_unit,
    };

    if (createPriceHistory.id)
      priceHistoryDto.id = Number(createPriceHistory.id);

    if (createPriceHistory.notes)
      priceHistoryDto.notas = createPriceHistory.notes;

    return { ...priceHistoryDto };
  }
}
