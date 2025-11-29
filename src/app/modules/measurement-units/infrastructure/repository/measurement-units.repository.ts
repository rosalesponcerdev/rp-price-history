import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import {
  MeasurementUnits,
  UnidadesMedida,
} from '@measurement-units/domain/model/measurement-units.model';
import { MeasurementUnitsPort } from '@measurement-units/domain/port/measurement-units.port';
import { MeasurementUnitsTransformer } from '@measurement-units/infrastructure/transformer/measurement-units.transformer';
import { EndPoint } from '@shared/enum';

@Injectable()
export class MeasurementUnitsHttpRepository implements MeasurementUnitsPort {
  private readonly _httpClient = inject(HttpClient);

  public async getAll(): Promise<MeasurementUnits[]> {
    const url = `/${EndPoint.MEASUREMENT_UNITS}`;
    const params = new HttpParams().set('select', '*');

    const measurements = await lastValueFrom(
      this._httpClient.get<UnidadesMedida[]>(url, { params })
    );

    return measurements.map(measurement =>
      MeasurementUnitsTransformer.from(measurement)
    );
  }
}
