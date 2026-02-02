import { makeEnvironmentProviders } from '@angular/core';

import { MeasurementUnitsService } from '@measurement-units/application/measurement-units.service';
import { ListMeasurementUnitsAppUseCase } from '@measurement-units/application/use-case';
import { MeasurementUnitsLocalRepository } from '@measurement-units/infrastructure/repository';
import { MEASUREMENT_UNITS_PORT } from './token';

export const provideMeasurementUnits = () =>
  makeEnvironmentProviders([
    {
      provide: MEASUREMENT_UNITS_PORT,
      // useClass: MeasurementUnitsHttpRepository,
      useClass: MeasurementUnitsLocalRepository,
    },
    ListMeasurementUnitsAppUseCase,

    MeasurementUnitsService,
  ]);
