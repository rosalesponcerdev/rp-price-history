import { Routes } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { ListComponent } from './views/list/list.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
];
