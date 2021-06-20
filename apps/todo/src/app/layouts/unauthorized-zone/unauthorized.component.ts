import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

const title = new Map([
    ['login', 'Добро пожаловать в тестовое приложение'],
    ['signup', 'Регистрация в тестовом приложении']
  ]
);

@Component({
  selector: 'app-unauthorized-zone',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedZoneComponent {
  public isLoginPage: boolean;
  public pageTitle: string;

  constructor(private readonly router: Router) {
    router.events
      .pipe(
        filter((route) => route instanceof NavigationEnd),
        map((route: NavigationEnd) => {
          this.isLoginPage = !!(route.url !== '/signup');
          this.pageTitle =  this.isLoginPage ? title.get('login') : title.get('signup');
          return route;
        })
      )
      .subscribe();
  }
}
