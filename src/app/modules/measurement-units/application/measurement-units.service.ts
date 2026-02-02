import { computed, inject, Injectable, Signal, signal } from '@angular/core';

import { MeasurementUnits } from '@measurement-units/domain/model/measurement-units.model';

import { MeasurementUnitsState } from '@shared/state';
import { ListMeasurementUnitsAppUseCase } from './use-case';

@Injectable()
export class MeasurementUnitsService {
  public readonly loading$: Signal<boolean>;

  private readonly _loading = signal<boolean>(false);

  private readonly _measurementUnitsState = inject(MeasurementUnitsState);
  private readonly _listUseCase = inject(ListMeasurementUnitsAppUseCase);

  constructor() {
    this.loading$ = computed(() => this._loading());
  }

  public async list(): Promise<MeasurementUnits[]> {
    if (this._measurementUnitsState.measurementUnits.length > 0) {
      return this._measurementUnitsState.measurementUnits;
    }

    const measurementUnits = await this._listUseCase.execute();

    this._measurementUnitsState.measurementUnits = measurementUnits;

    return measurementUnits;
  }
}
