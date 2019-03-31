import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
const BASEURL = 'http://localhost:8087';

@Injectable()
export class DataService {

  token: Subject<any>;


  constructor(private http: HttpClient) {
    this.token = new Subject<any>();
  }

  getPosts(): Observable<any> {
    return this.http.get(`${BASEURL}/api/posts`);
  }

  getPostById(id): Observable<any> {
    return this.http.get(`${BASEURL}/api/post?id=${id}`);
  }

  getUserPosts(userId): Observable<any> {
    return this.http.get(`${BASEURL}/api/user_posts?userId=${userId}`);
  }

  getJoinPosts(userId): Observable<any> {
    return this.http.get(`${BASEURL}/api/user_joins?userId=${userId}`);
  }

  updatePost(post ?: Object): Observable<any> {
    return this.http.post(`${BASEURL}/api/update_post`, post);
  }

  addPost(post ?: Object): Observable<any> {
    return this.http.post(`${BASEURL}/api/post`, post);
  }
}
