import { computed, Injectable, signal } from '@angular/core';
import { Category } from '@category/domain/model/category.model';

@Injectable()
export class CategoryState {
  private readonly _state$ = signal<Category[]>([]);
  public readonly state = computed(() => this._state$());

  public set categories(categories: Category[]) {
    this._state$.set(categories);
  }

  public get categories() {
    return this._state$();
  }
}
