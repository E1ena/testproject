import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


export enum TaskCategory {
  work = 'Работа',
  study = 'Учеба',
  hobby = 'Хобби'
}

enum TaskState {
  new = 'Новая',
  editing = 'Редактируемая',
  watch = ''
}
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @ViewChild('taskCategory', { static: false }) public taskCategory;
  public taskForm: FormGroup;
  public category = TaskCategory;
  public task = {
    state: null,
  };

  constructor() {
    this.task.state = TaskState.new;
    this.taskForm = new FormGroup({
      // TODO перенести id на бек
      id: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

}
