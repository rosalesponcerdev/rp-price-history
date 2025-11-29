import {
  computed,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

import { Session } from '@auth/domain/model';
import { SessionStorageService } from '@shared/services';

@Injectable()
export class SessionStore {
  private readonly state$: Signal<Session | undefined>;
  private readonly _state: WritableSignal<Session | undefined>;
  private readonly _sessionStorageKey = 'SESSION';

  private readonly _sessionStorageSrv = inject(SessionStorageService);

  constructor() {
    this._state = signal(
      this._sessionStorageSrv.getItem(this._sessionStorageKey)
    );

    this.state$ = computed(() => {
      return structuredClone(this._state());
    });
  }

  public get state() {
    return this.state$();
  }

  public set state(session: Session | undefined) {
    this._state.set(structuredClone(session || undefined));

    if (session) {
      this._sessionStorageSrv.setItem(this._sessionStorageKey, session);
      return;
    }

    this.clear();
  }

  public clear() {
    this._sessionStorageSrv.removeItem(this._sessionStorageKey);
  }
}
