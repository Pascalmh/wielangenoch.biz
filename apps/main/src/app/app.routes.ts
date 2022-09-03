import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
    {
      path: 'neu',
      loadComponent: () => import('./add-event/add-event.component').then((c) => c.AddEventComponent)
    },
    {
      path: 'dashboard',
      loadComponent: () =>
        import('./dashboard/dashboard.component').then(
          (c) => c.DashboardComponent
        ),
    },
  ];