import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'list',
    children: [
      {
        path: ':sheet',
        loadComponent: () =>
          import('./pages/list/list.page').then((m) => m.ListPage),
      },
    ],
  },
];
