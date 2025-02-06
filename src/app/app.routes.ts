import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list-books/list-books.component').then(m => m.ListBooksComponent),
    title: 'Open Library - Books'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
