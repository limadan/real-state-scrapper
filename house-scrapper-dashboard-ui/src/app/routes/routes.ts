import { Routes } from '@angular/router';
import { authGuard } from '../pages/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../pages/auth/auth-page.component').then(m => m.AuthPageComponent)
  },
  {
    path: '',
    loadComponent: () => import('./main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('../pages/property-pages/property-visualizer/property-visualizer.component').then(m => m.PropertyVisualizerComponent)
      },
      {
        path: 'property-details',
        loadComponent: () => import('../pages/property-pages/property-details/property-details.component').then(m => m.PropertyDetailsComponent)
      },
      {
        path: 'app-settings',
        loadComponent: () => import('../pages/app-settings/app-settings.component').then(m => m.AppSettingsComponent)
      },
      {
        path: 'app-logs',
        loadComponent: () => import('../pages/app-logs/logs-page.component').then(m => m.LogsPageComponent)
      },
      {
        path: 'favorites',
        loadComponent: () => import('../pages/property-pages/favorites/favorites-page.component').then(m => m.FavoritesPageComponent)
      }
    ]
  }
];
