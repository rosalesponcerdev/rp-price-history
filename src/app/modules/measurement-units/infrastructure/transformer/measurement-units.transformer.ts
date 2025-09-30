import { Item } from '@shared/interface';
import {
  MeasurementUnits,
  UnidadesMedida,
} from '@measurement-units/domain/model/measurement-units.model';

export class MeasurementUnitsTransformer {
  static from(measurement: UnidadesMedida): MeasurementUnits {
    return {
      id: measurement.id,
      abbreviation: measurement.abreviacion,
      name: measurement.nombre,
      measurementType: measurement.tipo_medida,
    };
  }

  static to(measurement: MeasurementUnits): UnidadesMedida {
    return {
      id: measurement.id,
      abreviacion: measurement.abbreviation,
      nombre: measurement.name,
      tipo_medida: measurement.measurementType,
    };
  }

  static toItemArray(measurement: MeasurementUnits[]): Item[] {
    return measurement.map(m => MeasurementUnitsTransformer.toItem(m));
  }

  static toItem(measurement: MeasurementUnits): Item {
    return {
      id: measurement.id,
      text: measurement.name,
    };
  }
}
