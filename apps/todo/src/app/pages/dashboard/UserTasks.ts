import { FiltersPriority, ShownTasksOptions, Task, TaskFilters, TaskStatus } from './dashboard.component';

export class UserTasks {
  private _tasks: Task[];
  private _filteredTasks: Task[];

  constructor(tasks) {
    this._tasks = tasks ? tasks : [];
    this._filteredTasks = this._tasks;
  }

  get filteredTasks(): Task[] {
    return this._filteredTasks;
  }

  get tasks(): Task[] {
    return this.filteredTasks;
  }

  // get tasksForDay(day?: Date): Task[] {
  //   return this._tasks.filter(task => task.date === Date);
  // }

  public changeTaskStatus(id: number): void {
    this._filteredTasks = this._filteredTasks.map(task => {
      if (task.id === id) {
        task.isDone = !task.isDone;
      }
      return task;
    });
  }

  public filter(filters: TaskFilters) { // { key: string; value: any; }
    this._filteredTasks = this._tasks;
    this._filteredTasks = this
      .filterTasksBySelectionOption({ key: 'selectionOption', value: filters.selectionOption })
      .filterTasksByName({ key: 'title', value: filters.title })
      .filterTasksByDate({ key: 'date', value: filters.date })
      .filterTasksByStatus({ key: 'isDone', value: filters.isDone })
      .filterTasksByCategory({ key: 'category', value: filters.category })
      .tasks;
  }


  private filterTasksBySelectionOption(parametr: { key: string; value: any; }) {
    if (!parametr.value) {
      return this;
    }
    switch (parametr.value) {
      case 'todayTasks':
        this._filteredTasks = this._tasks.filter(task => task.date.toLocaleDateString() === new Date().toLocaleDateString());
        break;
      case 'isNotDoneTasks':
        this._filteredTasks = this._tasks.filter(task => task.isDone === false);
        break;
      case 'allTasks':
        this._filteredTasks = this._tasks;
        break;
    }
    return this;
  }

  private filterTasksByName(parametr: { key: string; value: any; }) {
    if (!parametr.value) {
      return this;
    }
    this._filteredTasks = this._filteredTasks.filter(task => task.title.includes(parametr.value));
    return this;
  }

  private filterTasksByDate(parametr: { key: string; value: any; }) {
    if (!parametr.value) {
      return this;
    }
    this._filteredTasks = this._filteredTasks.filter(task => task.date.toLocaleDateString() === new Date(parametr.value).toLocaleDateString());
    return this;
  }

  private filterTasksByStatus(parametr: { key: string; value: any; }) {
    if (!parametr.value) {
      return this;
    }
    switch (parametr.value) {
      case TaskStatus.both:
        return this;
      case TaskStatus.false:
        this._filteredTasks = this._filteredTasks.filter(task => !task.isDone);
        return this;
      case TaskStatus.true:
        this._filteredTasks = this._filteredTasks.filter(task => task.isDone);
        return this;
    }
  }

  private filterTasksByCategory(parametr: { key: string; value: any; }) {
    if (!parametr.value) {
      return this;
    }
    this._filteredTasks = this._filteredTasks.filter(task => task.category === parametr.value);
    return this;
  }
}
