import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './task.component';

import { MaterialModule, UserServiceModule } from '@todo-app/client';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent
  }
];

@NgModule({
  declarations: [TaskComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    UserServiceModule
  ],
  providers: [],
  bootstrap: []
})
export class TaskModule {}
