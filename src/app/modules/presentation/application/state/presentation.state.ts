import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

import { Presentation } from '@presentation/domain/model';

@Injectable({ providedIn: 'root' })
export class PresentationState {
  public readonly currentPresentation$: Signal<Presentation | undefined>;
  public readonly presentations$: Signal<Presentation[]>;

  private readonly _presentations: WritableSignal<Presentation[]>;
  public readonly _currentPresentation: WritableSignal<
    Presentation | undefined
  >;

  public constructor() {
    this._presentations = signal<Presentation[]>([]);
    this.presentations$ = computed(() => this._presentations());

    this._currentPresentation = signal<Presentation | undefined>(undefined);
    this.currentPresentation$ = computed(() => this._currentPresentation());
  }

  get presentations(): Presentation[] {
    return this._presentations();
  }

  set presentations(presentation: Presentation[]) {
    this._presentations.set(structuredClone(presentation));
  }

  get currentPresentation(): Presentation | undefined {
    return this._currentPresentation();
  }

  set currentPresentation(presentation: Presentation | undefined) {
    this._currentPresentation.set(structuredClone(presentation));
  }

  unshift(nePresentation: Presentation) {
    this._presentations.update(presentations => [
      nePresentation,
      ...presentations,
    ]);
  }

  findById(presentationId: string) {
    return this.presentations.find(({ id }) => presentationId === id);
  }
}
