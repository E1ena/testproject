import { AfterViewInit, Component, Input, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('calendarTemplate', { static: false }) public calendarTemplate;
  @Input() public numberOfTasks: number;

  private calendarHtml = null;
  public currentDate;

  constructor(
    private readonly renderer: Renderer2,
    private readonly ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.currentDate = new Date();
  }

  ngAfterViewInit() {
    this.calendar();
    this.startTimer();
  }

  private monthIno = {
    numberOfDays: null,
    monthNumber: null,
    year: null
  };

  private startTimer() {
    this.ngZone.runOutsideAngular(() => {
      interval(1000).pipe()
        .subscribe(() => this.ngZone.run(() => this.currentDate = new Date()));
    });
  }

  public selectCurrentMonth() {
    this.calendar(this.currentDate.getMonth() + 1, this.currentDate.getFullYear());
  }

  private calendar(month?, year?) {
    if (this.calendarHtml) {
      this.renderer.removeChild(this.calendarTemplate.nativeElement, this.calendarHtml);
    }
    this.renderer.appendChild(this.calendarTemplate.nativeElement, this.renderCalendar(month, year));
  }

  public changeMonth(currentMonth) {
    let month, year;
    if (currentMonth === 'prev') {
      month = this.monthIno.monthNumber === 1 ? 12 : this.monthIno.monthNumber - 1;
      year = this.monthIno.monthNumber === 1 ? this.monthIno.year - 1 : this.monthIno.year;
    } else if (currentMonth === 'next') {
      month = this.monthIno.monthNumber === 12 ? 1 : this.monthIno.monthNumber + 1;
      year = this.monthIno.monthNumber === 12 ? this.monthIno.year + 1 : this.monthIno.year;
    }

    switch (currentMonth) {
      case'prev':
        this.calendar(month, year);
        break;
      case 'next':
        this.calendar(month, year);
        break;
    }
  }

  private renderCalendar(monthInp?, yearInp?) {
    const now = new Date();
    let month;
    let year;

    // labels for week days and months
    const daysLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const monthsLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // test if input date is correct, instead use current month
    month = (isNaN(monthInp) || monthInp == null) ? now.getMonth() + 1 : monthInp; // (now.getMonth() + 1)
    year = (isNaN(yearInp) || yearInp == null) ? now.getFullYear() : yearInp;


    const logical_month = month - 1;

    const currentDay = now.getDate();

    // get first day of month and first week day
    const first_day = new Date(year, logical_month, 1);
    const first_day_weekday = first_day.getDay() == 0 ? 7 : first_day.getDay();

    // find number of days in month
    const month_length = new Date(year, month, 0).getDate();
    const previous_month_length = new Date(year, logical_month, 0).getDate();

    // save month info
    this.monthIno.monthNumber = month;
    this.monthIno.year = year;
    this.monthIno.numberOfDays = month_length;


    // calendar header
    this.calendarHtml = this.renderer.createElement('div');
    this.renderer.addClass(this.calendarHtml, 'calendar-html');
    const calendarTitle = this.renderer.createElement('h2');
    this.renderer.appendChild(calendarTitle, this.renderer.createText(monthsLabels[logical_month] + ' ' + year));
    this.renderer.appendChild(this.calendarHtml, calendarTitle);

    // calendar content
    const table = this.renderer.createElement('table');
    this.renderer.addClass(table, 'calendar-table');

    // week days labels row
    const thead = this.renderer.createElement('thead');
    const trWeekDays = this.renderer.createElement('tr');
    this.renderer.addClass(trWeekDays, 'week-days');

    for (let i = 0; i <= 6; i++) {
      const th = this.renderer.createElement('th');
      this.renderer.addClass(th, 'day');
      this.renderer.appendChild(th, this.renderer.createText(daysLabels[i]));
      this.renderer.appendChild(trWeekDays, th);
    }
    this.renderer.appendChild(thead, trWeekDays);
    this.renderer.appendChild(table, thead);

    // define default day variables
    let day = 1, // current month days
      prev = previous_month_length - first_day_weekday + 2,
      // prev = 1, // previous month days
      next = 1; // next month days

    const tbody = this.renderer.createElement('tbody');

    for (let week = 0; week < 6; week++) {
      const trWeeks = this.renderer.createElement('tr');
      this.renderer.addClass(trWeeks, 'week');

      for (let dayW = 0; dayW < 7; dayW++) {
        if (first_day_weekday !== 1 && prev <= previous_month_length) {
          // prev = previous_month_length - first_day_weekday + prev + 1;
          const td = this.renderer.createElement('td');
          this.renderer.addClass(td, 'day');
          this.renderer.addClass(td, 'other-month');
          this.renderer.appendChild(td, this.renderer.createText(prev.toString()));
          this.renderer.appendChild(trWeeks, td);
          prev++;
        } else if (day <= month_length) {
          const td = this.renderer.createElement('td');
          this.renderer.addClass(td, 'day');
          this.renderer.appendChild(td, this.renderer.createText(day.toString()));
          this.renderer.appendChild(trWeeks, td);
          // if (day === currentDay) {
          //   this.renderer.addClass(td, 'is-current');
          // }
          day++;
        } else {
          const td = this.renderer.createElement('td');
          this.renderer.addClass(td, 'day');
          this.renderer.addClass(td, 'other-month');
          this.renderer.appendChild(td, this.renderer.createText(next.toString()));
          this.renderer.appendChild(trWeeks, td);
          next++;
        }
      }
      this.renderer.appendChild(tbody, trWeeks);
    }

    this.renderer.appendChild(table, tbody);
    this.renderer.appendChild(this.calendarHtml, table);

    return this.calendarHtml;
  }

}
