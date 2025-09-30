/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  inject,
  Injectable,
  Injector,
  inputBinding,
  Renderer2,
  RendererFactory2,
  signal,
} from '@angular/core';
import { Subject } from 'rxjs';

import { ModalComponent } from '@shared/components/modal/modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly renderer: Renderer2;
  private componentRef?: ComponentRef<ModalComponent>;

  private readonly applicationRef = inject(ApplicationRef);
  private readonly elementInjector = inject(Injector);
  private readonly rendererFactory = inject(RendererFactory2);

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  private readonly _modalConfig = new Subject<
    | {
        component?: any;
        data?: any;
      }
    | undefined
  >();

  private _closeSubj?: Subject<any | undefined>;

  public close(data?: any) {
    this._modalConfig.next(undefined);
    this.componentRef?.destroy();
    this._closeSubj?.next(data);
    this._closeSubj?.complete();
  }

  // eslint-disable-next-line @typescript-eslint/prefer-function-type
  public show<T extends { new (...args: any[]): any }>(
    component: T,
    data?: InstanceType<T>['data']
  ) {
    if (this._closeSubj) this.close();

    const closeSubj = new Subject();
    this._closeSubj = closeSubj;

    this.componentRef?.destroy();

    const componentRef = this._createModalBox(component, data);
    this.componentRef = componentRef;

    return this._closeSubj.asObservable();
  }

  private _createModalBox(
    component: any,
    data: any
  ): ComponentRef<ModalComponent> {
    const environmentInjector = this.applicationRef.injector;

    const dataBinding = signal(data);
    const componentType = signal(component);

    const componentRef = createComponent(ModalComponent, {
      environmentInjector,
      elementInjector: this.elementInjector,
      bindings: [
        inputBinding('componentType', componentType),
        inputBinding('data', dataBinding),
      ],
    });

    this.applicationRef.attachView(componentRef.hostView);

    this.renderer.appendChild(
      document.body,
      componentRef.location.nativeElement
    );

    componentRef.changeDetectorRef.detectChanges();

    return componentRef;
  }
}
