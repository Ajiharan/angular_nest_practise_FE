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
  private baseUrl = 'http://localhost:3000';
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
        map((data) => {
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);
          return data;
        })
      );
  }

  register(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/create`, {
      userName,
      password,
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
