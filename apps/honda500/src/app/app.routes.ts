import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'members',
    loadComponent: () =>
      import('./members/members.component').then((c) => c.MembersComponent),
  },
  {
    path: 'events',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./events/events.component').then((c) => c.EventsComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./events/details/details.component').then(
            (c) => c.DetailsComponent
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'members',
    pathMatch: 'full',
  },
];
