import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
const BASEURL = 'http://localhost:8088';

@Injectable()
export class DataService {

  token: Subject<any>;


  constructor(private http: HttpClient) {
    this.token = new Subject<any>();

  }


}
