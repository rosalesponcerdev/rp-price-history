import { Routes } from '@angular/router';

import { RoutesEnum } from '@shared/enum/routes.enum';

export const routes: Routes = [
  {
    path: RoutesEnum.BASE,
    loadComponent: () =>
      import('@main-view/ui/pages/main-view.container').then(
        c => c.MainViewContainerComponent
      ),
  },
  {
    path: RoutesEnum.PRODUCT,
    loadComponent: () =>
      import('@product/ui/page/product.page').then(c => c.ProductPageComponent),
  },
  {
    path: RoutesEnum.PRESENTATION,
    loadComponent: () =>
      import('@presentation/ui/page/presentation/presentation.page').then(
        c => c.PresentationPage
      ),
  },
  {
    path: '**',
    redirectTo: RoutesEnum.BASE,
  },
];
