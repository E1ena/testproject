import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@todo-app/client';
import { UnauthorizedZoneComponent } from './unauthorized.component';

const routes: Routes = [
  {
    path: '',
    component: UnauthorizedZoneComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./../../pages/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('./../../pages/signup/signup.module').then(m => m.SignUpModule)
      }
    ]
  }
];

@NgModule({
  declarations: [UnauthorizedZoneComponent],
  imports: [HttpClientModule, RouterModule.forChild(routes), MaterialModule],
  providers: [],
  bootstrap: []
})
export class UnauthorizedZoneModule {}
