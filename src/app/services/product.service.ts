import { iParams } from './../models/params';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getUsers(paramsData: iParams): Observable<any> {
    const params = new HttpParams()
      .set('limit', paramsData.limit)
      .set('offset', paramsData.offset);
    return this.http.get(`${this.baseUrl}/user/lists`, {
      params,
    });
  }
}
