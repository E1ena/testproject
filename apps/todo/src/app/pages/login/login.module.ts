import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

import { MaterialModule, UserServiceModule } from '@todo-app/client';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    UserServiceModule
  ],
  providers: [],
  bootstrap: []
})
export class LoginModule {}
