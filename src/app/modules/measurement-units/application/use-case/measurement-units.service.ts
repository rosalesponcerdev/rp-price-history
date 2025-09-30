import { computed, inject, Injectable, Signal, signal } from '@angular/core';

import { MeasurementUnitsHttpRepository } from '@measurement-units/infrastructure/repository/measurement-units.repository';
import { ListMeasurementUnitsUseCase } from '@measurement-units/domain/use-case/list-measurement-units.usecase';
import { MeasurementUnits } from '@measurement-units/domain/model/measurement-units.model';
import { MeasurementUnitsState } from '@shared/state';

@Injectable({ providedIn: 'root' })
export class MeasurementUnitsService {
  public readonly loading$: Signal<boolean>;

  private readonly _loading = signal<boolean>(false);
  private readonly _measurementUnitsRepository = inject(
    MeasurementUnitsHttpRepository
  );
  private readonly _measurementUnitsState = inject(MeasurementUnitsState);

  private readonly _listUseCase: ListMeasurementUnitsUseCase;

  constructor() {
    this.loading$ = computed(() => this._loading());

    this._listUseCase = new ListMeasurementUnitsUseCase(
      this._measurementUnitsRepository
    );
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
