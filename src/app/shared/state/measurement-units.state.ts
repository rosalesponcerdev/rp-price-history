import { computed, Injectable, signal } from '@angular/core';

import { MeasurementUnits } from '@measurement-units/domain/model/measurement-units.model';

@Injectable({ providedIn: 'root' })
export class MeasurementUnitsState {
  private readonly _state$ = signal<MeasurementUnits[]>([]);
  readonly state = computed(() => this._state$());

  set measurementUnits(categories: MeasurementUnits[]) {
    this._state$.set(categories);
  }

  get measurementUnits() {
    return this._state$();
  }
}
