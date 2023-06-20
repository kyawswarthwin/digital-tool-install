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
        path: ':sheetName',
        loadComponent: () =>
          import('./pages/list/list.page').then((m) => m.ListPage),
        children: [
          {
            path: '',
            redirectTo: 'all-items',
            pathMatch: 'full',
          },
          {
            path: 'all-items',
            loadComponent: () =>
              import('./pages/all-items/all-items.page').then(
                (m) => m.AllItemsPage
              ),
          },
          {
            path: 'item-groups',
            loadComponent: () =>
              import('./pages/item-groups/item-groups.page').then(
                (m) => m.ItemGroupsPage
              ),
          },
        ],
      },
    ],
  },
];
