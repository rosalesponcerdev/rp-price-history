import { signal } from '@angular/core';

export abstract class Loading<T> {
  private readonly _loading = signal<T>({} as T);

  constructor(initialValue: T) {
    this._loading.set({ ...initialValue });
  }

  protected _setLoading(type: keyof T, value = true) {
    this._loading.update(state => ({ ...state, [type]: value }));
  }
}
