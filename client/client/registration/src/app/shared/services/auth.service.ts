import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
const BASEURL = 'http://ws.otravel.tk:9100';

@Injectable()
export class AuthService {

  token: Subject<any>;


  constructor(private http: HttpClient) {
    this.token = new Subject<any>();

  }

  getToken(userVM: any): Observable<any> {

    return this.http.post(`${BASEURL}/api/login`, userVM).pipe(
      tap(it => this.handleResult(it, userVM))
    );

  }

  handleResult(it: any, vm) {
    this.token.next(it);
    console.log(it);
    localStorage.setItem('token', it.token);
    const date = (new Date()).getTime();
    localStorage.setItem('loginTime', date + '');
    localStorage.setItem('vm', JSON.stringify(vm));
  }

  getUser(): Observable<any> {
    return this.http.get(`${BASEURL}/api/jwt_user`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${BASEURL}/api/user?id=${id}`);
  }

  updateUser(user: Object): Observable<any> {
    return this.http.post(`${BASEURL}/api/update_user`, user);
  }

  clearToken() {
    localStorage.removeItem('token');
  }
}
