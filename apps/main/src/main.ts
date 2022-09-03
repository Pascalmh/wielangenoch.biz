import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Route } from '@angular/router';

if (environment.production) {
  enableProdMode();
}

export const ROUTES: Route[] = [
  {
    path: 'neu',
    loadComponent: () => import('./app/add-event/add-event.component').then((c) => c.AddEventComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./app/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES),
    importProvidersFrom(BrowserAnimationsModule),
  ],
});
