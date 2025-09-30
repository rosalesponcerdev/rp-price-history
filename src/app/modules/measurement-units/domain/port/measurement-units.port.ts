import { MeasurementUnits } from '@measurement-units/domain/model/measurement-units.model';

export interface MeasurementUnitsPort {
  getAll(): Promise<MeasurementUnits[]>;
}
