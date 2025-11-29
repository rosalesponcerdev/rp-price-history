import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  public getItem<T>(key: string): T | undefined {
    const value = sessionStorage.getItem(key);

    try {
      if (!value) return undefined;

      return JSON.parse(atob(value));
    } catch (_error) {
      return undefined;
    }
  }

  public setItem<T>(key: string, value: T | undefined) {
    const normalizedValue = JSON.stringify((value || '') as string);

    const encrypted = btoa(normalizedValue);

    sessionStorage.setItem(key, encrypted);
  }

  public removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  public clear() {
    sessionStorage.clear();
  }
}
