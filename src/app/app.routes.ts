import { Routes } from '@angular/router';

export const routes: Routes = [
  // Default route
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Home
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },

  // Recipe Details (needs an id)
  {
    path: 'recipe-details/:id',
    loadComponent: () =>
      import('./pages/recipe-details/recipe-details.page').then(
        (m) => m.RecipeDetailsPage
      ),
  },

  // Favourites
  {
    path: 'favourites',
    loadComponent: () =>
      import('./pages/favourites/favourites.page').then(
        (m) => m.FavouritesPage
      ),
  },

  // Settings
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.page').then((m) => m.SettingsPage),
  },
];
