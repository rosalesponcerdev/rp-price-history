import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { Store } from '@shared/context/store/domain/model';
import { StorePort } from '@shared/context/store/domain/port';
import { EndPoint } from '@shared/enum';
import { StoreDto } from '../dto/store.dto';
import { StoreMapper } from '../mapper/store.mapper';

export const STORE_HTTP_REPOSITORY = new InjectionToken<StorePort>(
  'StoreHttpRepository'
);

@Injectable()
export class StoreHttpRepository implements StorePort {
  private readonly URL = `/${EndPoint.STORES}`;

  private readonly _httClient = inject(HttpClient);

  public async getAll(): Promise<Store[]> {
    const store = await lastValueFrom(
      this._httClient.get<StoreDto[]>(this.URL, {
        params: {
          select: '*',
        },
      })
    );

    return StoreMapper.fromArray(store);
  }
}
