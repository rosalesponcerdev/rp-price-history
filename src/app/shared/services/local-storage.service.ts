import { Injectable } from '@angular/core';

import { DomStorage } from '../class';

@Injectable({ providedIn: 'root' })
export class LocalStorageService extends DomStorage {
  constructor() {
    super(localStorage);
  }
}
