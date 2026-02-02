import { computed, inject, Injectable, signal } from '@angular/core';

import { SignalValue } from '@shared/interface';

import { MeasurementUnitsService } from '@modules/measurement-units/application/measurement-units.service';
import { PresentationState } from '@presentation/application/state';
import { CreatePresentation, Presentation } from '@presentation/domain/model';
import {
  CreatePresentationUseCase,
  GetPresentationByIdUseCase,
  getPresentationsByProductUseCase,
} from '@presentation/domain/use-case';
import { PRESENTATION_PORT } from './providers/token';

@Injectable()
export class PresentationService {
  private readonly _loading = signal({
    create: false,
    getByProduct: false,
    getById: false,
  });

  public readonly loading$ = computed(() => this._loading());

  private readonly _createPresentationUseCase: CreatePresentationUseCase;
  private readonly _getPresentationsByProductUseCase: getPresentationsByProductUseCase;
  private readonly _getPresentationByIdUseCase: GetPresentationByIdUseCase;

  private readonly _measurementUnitsSrv = inject(MeasurementUnitsService);
  private readonly _presentationHttpRepository = inject(PRESENTATION_PORT);

  private readonly _presentationState = inject(PresentationState);

  constructor() {
    this._createPresentationUseCase = new CreatePresentationUseCase(
      this._presentationHttpRepository
    );

    this._getPresentationsByProductUseCase =
      new getPresentationsByProductUseCase(this._presentationHttpRepository);

    this._getPresentationByIdUseCase = new GetPresentationByIdUseCase(
      this._presentationHttpRepository
    );
  }

  public async create(createPresentation: CreatePresentation) {
    try {
      this._setLoading('create', true);

      const newPresentation =
        await this._createPresentationUseCase.execute(createPresentation);

      this._presentationState.unshift(newPresentation);
      return true;
    } catch (error: unknown) {
      console.warn((error as { message: string }).message);

      throw error;
    } finally {
      this._setLoading('create', false);
    }
  }

  public async getPresentationsByProductId(productId: string) {
    this._setLoading('getByProduct', true);

    const [measurementUnits, presentations] = await Promise.all([
      this._measurementUnitsSrv.list(),
      this._getPresentationsByProductUseCase.execute(productId),
    ]);

    const res = presentations.map(p => {
      const unit = measurementUnits.find(
        u => `${p.unitOfMeasureId}` === `${u.id}`
      );

      if (!unit) return p;

      return { ...p, unitOfMeasure: unit };
    });

    this._presentationState.presentations = res;

    this._setLoading('getByProduct', false);
  }

  public async getPresentationById(
    presentationId: string
  ): Promise<Presentation> {
    this._setLoading('getById', true);

    const presentationData =
      await this._getPresentationByIdUseCase.execute(presentationId);

    this._presentationState.currentPresentation = presentationData;

    this._setLoading('getById', false);

    return presentationData;
  }

  private _setLoading(
    type: keyof SignalValue<typeof this._loading>,
    value: boolean
  ) {
    this._loading.update(state => ({ ...state, [type]: value }));
  }
}
