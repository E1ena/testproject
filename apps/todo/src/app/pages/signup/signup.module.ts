import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@todo-app/client';
import { SignUpComponent } from './signup.component';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent
  }
];

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  providers: [],
  bootstrap: []
})
export class SignUpModule {}
