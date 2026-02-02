import {
  MeasurementUnits,
  UnidadesMedida,
} from '@measurement-units/domain/model/measurement-units.model';
import { Item } from '@shared/interface';

export class MeasurementUnitsTransformer {
  public static from(measurement: UnidadesMedida): MeasurementUnits {
    return {
      id: measurement.id,
      abbreviation: measurement.abreviacion,
      name: measurement.nombre,
      measurementType: measurement.tipo_medida,
    };
  }

  public static to(measurement: MeasurementUnits): UnidadesMedida {
    return {
      id: measurement.id,
      abreviacion: measurement.abbreviation,
      nombre: measurement.name,
      tipo_medida: measurement.measurementType,
    };
  }

  public static toItemArray(measurement: MeasurementUnits[]): Item[] {
    return measurement.map(m => MeasurementUnitsTransformer.toItem(m));
  }

  public static toItem(measurement: MeasurementUnits): Item {
    return {
      id: measurement.id,
      text: measurement.name,
    };
  }
}
