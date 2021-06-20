import { AfterViewInit, Component, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { UserTasks } from './UserTasks';

export interface Task {
  id: number;
  title: string;
  date: Date;
  description: string;
  isDone: boolean;
  category: string;
}

export enum TaskCategory {
  work = 'Работа',
  study = 'Учеба',
  hobby = 'Хобби'
}

export enum TaskStatus {
  false = 'В работе',
  true = 'Выполненая',
  both = 'Все'
}

export enum ShownTasksOptions {
  todayTasks = 'на сегодня',
  isNotDoneTasks = 'все в работе',
  allTasks = 'все'
}

export enum FiltersPriority {
  date,
  selectionOption,
  category
}

export interface TaskFilters {
  title: string;
  date: Date;
  category: string;
  isDone: boolean;
  selectionOption: ShownTasksOptions;
  priority: FiltersPriority;
}

@Component({
  selector: 'app-dashboard-zone',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('cardTitle', { static: false }) public cardTitle;
  @ViewChild('cardDesc', { static: false }) public cardDesc;

  public loading = true;
  public numberOfTasks: number = 0;

  @ViewChild('taskName', { static: false }) public taskName;
  @ViewChild('taskDate', { static: false }) public taskDate;
  @ViewChild('taskStatus', { static: false }) public taskStatus;
  @ViewChild('taskCategory', { static: false }) public taskCategory;

  private a: Task[] = [];
  public userTasks = null;
  public dashboardTasks = null;
  // public filteredUserTasks: Task[] = [];
  public status = TaskStatus;
  public category = TaskCategory;
  public taskFilterForm: FormGroup;

  @ViewChild('shownTasks', { static: false }) public shownTasks;
  public shownTasksOptions = ShownTasksOptions;
  public selectedTasks = 'todayTasks';

  constructor() {
  }

  ngOnInit(): void {
    // TODO
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);

    this.a = [
      {
        id: 1,
        title: 'Хакнуть Пентагон',
        date: new Date(),
        description: 'Узнать все секреты. Копирнуть весь код',
        isDone: true,
        category: 'work'
      }, {
        id: 2,
        title: 'Выучить html',
        date: new Date(),
        description: 'Стать html программистом за 300к в сек',
        isDone: false,
        category: 'study'
      }, {
        id: 3,
        title: 'Собрать группу',
        date: new Date(),
        description: 'Собрать роцк группу и поехать в мировое турне',
        isDone: false,
        category: 'hobby'
      }, {
        id: 4,
        title: 'Напечь пирожков',
        date: tomorrow,
        description: 'Приготовить пирожки для бабушки',
        isDone: false,
        category: 'hobby'
      }
    ];

    this.userTasks = new UserTasks(this.a);
    this.setInitFilters();
    // this.dashboardTasks = this.userTasks.tasks;
    this.numberOfTasks = this.userTasks.tasks.length;

    // -----

    this.taskFilterForm = new FormGroup({
      name: new FormControl('', []),
      date: new FormControl('', []),
      status: new FormControl('', []),
      category: new FormControl('', [])
    });
  }

  ngAfterViewInit() {
    this.shownTasks.value = this.selectedTasks;
  }

  private renderCard() {
    this.cardTitle.nativeElement.innerText = 'Card Title Yo!';
    this.cardDesc.nativeElement.innerText = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero dicta repellat quibusdam assumenda at distinctio similique eos? Officiis voluptatem accusamus, id odit, quos eaque nemo, dicta quidem eum eligendi veritatis.';
    this.loading = false;
  };

  private filters: TaskFilters = {
    title: null,
    date: null,
    category: null,
    isDone: null,
    selectionOption: ShownTasksOptions.todayTasks,
    priority: FiltersPriority.selectionOption // 'date' 'category'
  };

  public changeTaskSelectionOptions(key) {
    this.selectedTasks = key;
    this.changeFilterPriority({ key: 'selectionOption', value: key });
    this.setFilter({ key: 'selectionOption', value: key });
    this.applyFilters();
  }

  private changeFilterPriority(parametr: { key: string; value: any; }) {
    this.setFilter({ key: 'priority', value: parametr.key });
    switch (parametr.key) {
      case 'date':
        this.setFilter({ key: 'selectionOption', value: ShownTasksOptions.allTasks });
        this.selectedTasks = 'allTasks';
        break;
      case 'isDone':
        this.setFilter({ key: 'selectionOption', value: ShownTasksOptions.allTasks });
        this.selectedTasks = 'allTasks';
        break;
      case 'selectionOption':
        switch (parametr.value) {
          case 'todayTasks':
            this.setFilter({ key: 'date', value: null });
            this.taskFilterForm.controls.date.setValue('');
            break;
          case 'isNotDoneTasks':
            this.setFilter({ key: 'isDone', value: null });
            this.taskFilterForm.controls.status.setValue('');
            break;
          case 'allTasks':
            break;
        }
        break;
    }
  }

  public useFilter(parametr: { key: string; value: any; }) {
    this.changeFilterPriority({ key: parametr.key, value: parametr.value });
    this.setFilter(parametr);
    this.applyFilters();
  }

  private setInitFilters() {
    this.setFilter({ key: 'selectionOption', value: 'todayTasks' });
    this.applyFilters();
  }

  private setFilter(parametr: { key: string; value: any; }) {
    this.filters[parametr.key] = parametr.value;
  }

  private applyFilters() {
    this.userTasks.filter(this.filters);
  }

  public clearFilters() {
    this.taskFilterForm.reset();
    this.selectedTasks = 'todayTasks';

    for (const key in this.filters) {
      this.filters[key] = null;
    }
    this.setInitFilters();
    // this.applyFilters();
  }

  public getTaskCategory(category): string {
    return TaskCategory[category];
  }

  public changeTaskStatus(id: number) {
    this.userTasks.changeTaskStatus(id);
  }
}
