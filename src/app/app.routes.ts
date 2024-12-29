import { Routes } from '@angular/router';
import { EditComponent } from '@views/edit/edit.component';
import { ListComponent } from '@views/list/list.component';

import { RoutesEnum } from '@core/enum/routes.enum';

export const routes: Routes = [
  {
    path: RoutesEnum.BASE,
    component: ListComponent,
  },
  {
    path: RoutesEnum.EDIT,
    component: EditComponent,
  },
  {
    path: '**',
    redirectTo: RoutesEnum.BASE,
  },
];
