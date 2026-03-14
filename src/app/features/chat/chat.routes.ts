import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./chat'),
  },
] satisfies Routes;
