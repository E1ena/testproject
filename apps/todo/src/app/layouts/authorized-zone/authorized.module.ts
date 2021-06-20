import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@todo-app/client';
import { AuthorizedZoneComponent } from './authorized.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizedZoneComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./../../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      }, {
        path: ':id',
        loadChildren: () =>
          import('./../../pages/task/task.module').then(m => m.TaskModule)
      }
    ]
  }
];

@NgModule({
  declarations: [AuthorizedZoneComponent],
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(routes), MaterialModule],
  providers: [],
  bootstrap: []
})
export class AuthorizedZoneModule {
}
