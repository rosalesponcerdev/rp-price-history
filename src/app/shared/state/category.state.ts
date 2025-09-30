import { computed, Injectable, signal } from '@angular/core';
import { Category } from '@category/domain/model/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryState {
  private readonly _state$ = signal<Category[]>([]);
  readonly state = computed(() => this._state$());

  set categories(categories: Category[]) {
    this._state$.set(categories);
  }

  get categories() {
    return this._state$();
  }
}
