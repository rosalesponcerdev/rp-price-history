import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { EndPoint } from '@shared/enum';

import { CreatePriceHistory, PriceHistory } from '@price-history/domain/model';
import { PriceHistoryPort } from '@price-history/domain/port';
import { PriceHistoryDto } from '@price-history/infrastructure/dto';
import { PriceHistoryMapper } from '@price-history/infrastructure/mapper';

@Injectable()
export class PriceHistoryHttpRepository implements PriceHistoryPort {
  private readonly URL = `/${EndPoint.PRICE_HISTORY}`;

  private readonly _httpClient = inject(HttpClient);

  public async create(
    createPriceHistory: CreatePriceHistory
  ): Promise<PriceHistory> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Prefer', 'return=representation');

    const body = PriceHistoryMapper.toCreate(createPriceHistory);

    const [data] = await lastValueFrom(
      this._httpClient.post<PriceHistoryDto[]>(this.URL, body, {
        headers,
      })
    );

    return PriceHistoryMapper.from(data);
  }

  public async getByPresentation(
    presentationId: string
  ): Promise<PriceHistory[]> {
    const params: Record<string, string> = {
      select: '*,tiendas(id,nombre,direccion)',
      presentacion_id: `eq.${presentationId}`,
    };

    const priceHistory = await lastValueFrom(
      this._httpClient.get<PriceHistoryDto[]>(this.URL, {
        params,
      })
    );

    return PriceHistoryMapper.fromArray(priceHistory);
  }
}
