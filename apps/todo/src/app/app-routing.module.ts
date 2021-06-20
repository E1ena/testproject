import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/unauthorized-zone/unauthorized.module').then(m => m.UnauthorizedZoneModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./layouts/authorized-zone/authorized.module').then(m => m.AuthorizedZoneModule)
  },
  {
    path: '***',
    loadChildren: () => import('./layouts/unauthorized-zone/unauthorized.module').then(m => m.UnauthorizedZoneModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
