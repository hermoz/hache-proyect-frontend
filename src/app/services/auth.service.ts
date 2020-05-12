import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_AUTH_ENDPOINT_URL, API_HTTP_OPTIONS } from '../constants';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

/**
 * Service used to send login Http Post request to backend
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(API_AUTH_ENDPOINT_URL, {
      username: credentials.username,
      password: credentials.password
    }, API_HTTP_OPTIONS);
  }

}
