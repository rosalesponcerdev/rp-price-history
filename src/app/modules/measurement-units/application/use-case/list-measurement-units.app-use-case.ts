import { inject, Injectable } from '@angular/core';

import { MeasurementUnits } from '@measurement-units/domain/model';
import { MEASUREMENT_UNITS_PORT } from '../providers/token';

@Injectable()
export class ListMeasurementUnitsAppUseCase {
  private readonly _measurementUnitsRepository = inject(MEASUREMENT_UNITS_PORT);

  public execute(): Promise<MeasurementUnits[]> {
    return this._measurementUnitsRepository.getAll();
  }
}
