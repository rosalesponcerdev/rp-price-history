import { InjectionToken } from '@angular/core';

import { MeasurementUnitsPort } from '../../domain/port';

export const MEASUREMENT_UNITS_PORT = new InjectionToken<MeasurementUnitsPort>(
  'MEASUREMENT_UNITS_PORT'
);
