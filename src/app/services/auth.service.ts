import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Iuser } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Iuser | null>;
  private baseUrl =
    'https://900790c9-982e-42d4-a8e5-6362d6786cf3.mock.pstmn.io';
  public currentUser: Observable<Iuser | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Iuser | null>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject?.asObservable();
  }

  public get currentUserValue(): Iuser | null {
    return this.currentUserSubject?.value;
  }

  login(userName: string, password: string | undefined) {
    return this.http
      .post<any>(`${this.baseUrl}/user/login`, { userName, password })
      .pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
