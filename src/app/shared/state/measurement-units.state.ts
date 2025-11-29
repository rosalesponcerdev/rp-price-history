import { computed, Injectable, signal } from '@angular/core';

import { MeasurementUnits } from '@measurement-units/domain/model/measurement-units.model';

@Injectable()
export class MeasurementUnitsState {
  private readonly _state$ = signal<MeasurementUnits[]>([]);
  public readonly state = computed(() => this._state$());

  public set measurementUnits(categories: MeasurementUnits[]) {
    this._state$.set(categories);
  }

  public get measurementUnits() {
    return this._state$();
  }
}
