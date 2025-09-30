import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  signal,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'rp-modal',
  imports: [NgClass],
  template: `<div
    [ngClass]="{ hidden: hidden() }"
    class="w-full h-full fixed top-0 left-0 flex items-center justify-center bg-black/70 z-10">
    <section class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-2xl">
      <ng-template #hostModal></ng-template>
    </section>
  </div>`,
})
export class ModalComponent implements AfterViewInit {
  public readonly hidden = signal<boolean>(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public componentType = input<any>();
  public data = input();

  @ViewChild('hostModal', { static: true, read: ViewContainerRef })
  private readonly hostModal?: ViewContainerRef;

  private readonly changeDetector = inject(ChangeDetectorRef);

  public ngAfterViewInit(): void {
    this._renderDynamicComponentInHost(this.componentType(), this.data());
  }

  private _renderDynamicComponentInHost(
    component: Type<unknown>,
    data: unknown
  ) {
    if (!component) return;

    const hostElement = this.hostModal?.element.nativeElement;

    if (!hostElement) return;

    this.hostModal.clear();

    const componentRef = this.hostModal?.createComponent(component);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (data) (componentRef as any).instance.data = { ...data };

    this.changeDetector.detectChanges();

    this.hidden.set(false);
  }
}
