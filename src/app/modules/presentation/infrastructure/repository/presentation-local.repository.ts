import { inject, Injectable } from '@angular/core';

import { MEASUREMENT_UNITS_PORT } from '@measurement-units/application/providers/token';
import { CreatePresentation, Presentation } from '@presentation/domain/model';
import { PresentationPort } from '@presentation/domain/port';
import { LocalStorageService } from '@shared/services';

@Injectable()
export class PresentationLocalRepository implements PresentationPort {
  private readonly _storageKey = 'PRESENTATION';

  private readonly _localStorageSrv = inject(LocalStorageService);
  private readonly _unitMeasure = inject(MEASUREMENT_UNITS_PORT);

  public async getPresentationsByProduct(
    productId: string
  ): Promise<Presentation[]> {
    const presentationList =
      this._localStorageSrv.getItem<Presentation[]>(this._storageKey) ?? [];

    return presentationList.filter(p => p.productId === productId);
  }

  public async create(
    createPresentation: CreatePresentation
  ): Promise<Presentation> {
    const tempPresentation: Presentation = {
      brandId: createPresentation.brandId,
      presentationName: createPresentation.presentationName,
      productId: createPresentation.productId,
      product: createPresentation.product,
      unitOfMeasure: createPresentation.unitOfMeasure,
      brand: createPresentation.brand,
      barcode: createPresentation.barcode ?? null,
      additionalDescription: createPresentation.additionalDescription ?? null,
      quantity: createPresentation.quantity,
      unitOfMeasureId: createPresentation.unitOfMeasureId,
      id: crypto.randomUUID(),
      createdAt: new Date(Date.now()).toISOString(),
      updatedAt: new Date(Date.now()).toISOString(),
    };

    const presentationList =
      this._localStorageSrv.getItem<Presentation[]>(this._storageKey) ?? [];

    this._localStorageSrv.setItem(this._storageKey, [
      tempPresentation,
      ...presentationList,
    ]);

    return tempPresentation;
  }

  public async getById(id: string): Promise<Presentation> {
    const presentationList =
      this._localStorageSrv.getItem<Presentation[]>(this._storageKey) ?? [];

    const unitList = await this._unitMeasure.getAll();

    const presentation = presentationList.find(p => p.id === id);

    if (presentation?.unitOfMeasureId) {
      const unitOfMeasure = unitList.find(
        u => u.id === presentation.unitOfMeasureId
      );
      presentation.unitOfMeasure = unitOfMeasure;
    }

    if (!presentation) throw 'NO PRESENTATION FOUND';

    return presentation;
  }
}
