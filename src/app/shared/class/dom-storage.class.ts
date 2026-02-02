export class DomStorage {
  constructor(private readonly _domStorage: Storage) {}

  public getItem<T>(key: string): T | undefined {
    const value = this._domStorage.getItem(key);

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

    this._domStorage.setItem(key, encrypted);
  }

  public removeItem(key: string) {
    this._domStorage.removeItem(key);
  }

  public clear() {
    this._domStorage.clear();
  }
}
