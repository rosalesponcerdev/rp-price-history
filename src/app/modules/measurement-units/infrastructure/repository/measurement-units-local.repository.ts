import { inject, Injectable } from '@angular/core';

import { MeasurementUnits } from '@measurement-units/domain/model/measurement-units.model';
import { MeasurementUnitsPort } from '@measurement-units/domain/port/measurement-units.port';
import { LocalStorageService } from '@shared/services';

@Injectable()
export class MeasurementUnitsLocalRepository implements MeasurementUnitsPort {
  private readonly _storageKey = 'MEASUREMENT_UNITS';

  private readonly _localStorageSrv = inject(LocalStorageService);

  constructor() {
    this._populate();
  }

  public async getAll(): Promise<MeasurementUnits[]> {
    const measurementUnits = this._localStorageSrv.getItem<MeasurementUnits[]>(
      this._storageKey
    );

    return measurementUnits ?? [];
  }

  private _populate() {
    const temp: MeasurementUnits[] = [
      {
        id: crypto.randomUUID(),
        name: 'Unidad',
        abbreviation: 'u',
        measurementType: 'unidad',
      },
      {
        id: crypto.randomUUID(),
        name: 'Gramos',
        abbreviation: 'g',
        measurementType: 'peso',
      },
      {
        id: crypto.randomUUID(),
        name: 'Kilogramos',
        abbreviation: 'kg',
        measurementType: 'peso',
      },
      {
        id: crypto.randomUUID(),
        name: 'Mililitros',
        abbreviation: 'ml',
        measurementType: 'volumen',
      },
      {
        id: crypto.randomUUID(),
        name: 'Litros',
        abbreviation: 'l',
        measurementType: 'volumen',
      },
    ];

    this._localStorageSrv.setItem(this._storageKey, temp);
  }
}
