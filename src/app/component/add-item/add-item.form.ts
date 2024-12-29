import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UnitOptions } from '@core/interface/unit-options.interface';

export const ADD_ITEM_FORM = () =>
  new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    price: new FormControl<number | null>(null, [Validators.required]),
    quantity: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    unit: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

export const GET_UNIT_OPTIONS = (): UnitOptions[] => [
  {
    label: 'Otros',
    options: [
      {
        value: 'unit',
        label: 'Unidad',
      },
    ],
  },
  {
    label: 'Peso/Masa',
    options: [
      {
        value: 'mg',
        label: 'Miligramos (mg)',
      },
      {
        value: 'g',
        label: 'Gramos (g)',
      },
      { value: 'kg', label: 'Kilogramos (kg)' },
      { value: 'lb', label: 'Libras (lb)' },
      { value: 'oz', label: 'Onzas (oz)' },
    ],
  },
  {
    label: 'Longitud',
    options: [
      { value: 'mm', label: 'Milímetros (mm)' },
      { value: 'cm', label: 'Centímetros (cm)' },
      { value: 'm', label: 'Metros (m)' },
      { value: 'in', label: 'Pulgadas (in)' },
      { value: 'ft', label: 'Pies (ft)' },
    ],
  },
  {
    label: 'Volumen',
    options: [
      { value: 'ml', label: 'Mililitros (ml)' },
      { value: 'cc', label: 'Centímetros cúbicos (cc)' },
      { value: 'l', label: 'Litros (l)' },
      { value: 'm3', label: 'Metros cúbicos (m³)' },
      { value: 'fl oz', label: 'Onzas líquidas (fl oz)' },
      { value: 'cups', label: 'Tazas (cups)' },
      { value: 'gal', label: 'Galones (gal)' },
    ],
  },
];
