import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar.component';

import { MaterialModule, UserServiceModule } from '@todo-app/client';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent
  }
];

@NgModule({
  declarations: [CalendarComponent],
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
