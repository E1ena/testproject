import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BasicUser } from '@todo-app/api-interfaces';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) { }

  public getToken(body: BasicUser) {
      return this.http.post<any>(`token`, body);
  }

  public login(body: BasicUser) {
      return this.http.post<any>(`lgin`, body);
  }

}