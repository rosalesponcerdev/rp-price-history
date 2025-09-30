import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { CreatePresentation, Presentation } from '@presentation/domain/model';
import { PresentationPort } from '@presentation/domain/port';
import { PresentationDto } from '@presentation/infrastructure/dto';
import { PresentationMapper } from '@presentation/infrastructure/mapper';
import { EndPoint } from '@shared/enum';

@Injectable()
export class PresentationHttpRepository implements PresentationPort {
  private readonly _httpSrv = inject(HttpClient);

  public async getPresentationsByProduct(
    productId: number
  ): Promise<Presentation[]> {
    const url = `${EndPoint.BASE_URL}/${EndPoint.PRESENTATION}`;

    const params: Partial<Record<keyof PresentationDto | 'select', string>> = {
      select: '*',
      producto_id: `eq.${productId}`,
    };

    const data = await lastValueFrom(
      this._httpSrv.get<PresentationDto[]>(url, { params })
    );

    return PresentationMapper.fromArray(data);
  }

  public async create(
    createPresentation: CreatePresentation
  ): Promise<Presentation> {
    const url = `${EndPoint.BASE_URL}/${EndPoint.PRESENTATION}`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Prefer', 'return=representation');

    const body = PresentationMapper.toCreate(createPresentation);

    const [data] = await lastValueFrom(
      this._httpSrv.post<PresentationDto[]>(url, body, {
        headers,
      })
    );

    return PresentationMapper.from(data);
  }

  public async getById(id: string): Promise<Presentation> {
    const url = `${EndPoint.BASE_URL}/${EndPoint.PRESENTATION}`;

    const params: Partial<Record<keyof PresentationDto | 'select', string>> = {
      select: '*,marcas(*),unidades_medida(*),productos(*)',
      id: `eq.${id}`,
    };

    const [data] = await lastValueFrom(
      this._httpSrv.get<PresentationDto[]>(url, { params })
    );

    return PresentationMapper.from(data);
  }
}
