import { Routes } from '@angular/router';

import { RoutesEnum } from '@shared/enum/routes.enum';

import { LoginGuard } from '@auth/ui/guard';
import { PortalPage } from '@portal/page/portal.page';
import { providePortal } from '@portal/providers';

export const routes: Routes = [
  {
    path: RoutesEnum.BASE,
    component: PortalPage,
    // canActivate: [LoggedGuard],
    providers: [...providePortal()],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@main-view/ui/pages/main-view.container').then(
            c => c.MainViewContainerComponent
          ),
      },
      {
        path: RoutesEnum.PRODUCT,
        loadComponent: () =>
          import('@product/ui/page/product.page').then(
            c => c.ProductPageComponent
          ),
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
        pathMatch: 'full',
      },
    ],
  },
  {
    path: RoutesEnum.LOGIN,
    canActivate: [LoginGuard],
    loadComponent: () =>
      import('@auth/ui/page/login/login.page').then(c => c.LoginPage),
  },
  {
    path: '**',
    redirectTo: RoutesEnum.BASE,
    pathMatch: 'full',
  },
];
