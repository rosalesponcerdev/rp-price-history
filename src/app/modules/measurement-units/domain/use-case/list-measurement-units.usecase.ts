import { MeasurementUnits } from '@measurement-units/domain/model/measurement-units.model';
import { MeasurementUnitsPort } from '@measurement-units/domain/port/measurement-units.port';

export class ListMeasurementUnitsUseCase {
  constructor(
    private readonly _measurementUnitsRepository: MeasurementUnitsPort
  ) {}

  public execute(): Promise<MeasurementUnits[]> {
    return this._measurementUnitsRepository.getAll();
  }
}
