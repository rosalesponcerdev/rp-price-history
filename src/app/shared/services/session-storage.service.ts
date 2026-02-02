import { Injectable } from '@angular/core';

import { DomStorage } from '../class';

@Injectable({ providedIn: 'root' })
export class SessionStorageService extends DomStorage {
  constructor() {
    super(sessionStorage);
  }
}
