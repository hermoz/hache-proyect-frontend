import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../constants';

const AUTH_API_URL = API_URL + 'auth/authenticate';

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
    return this.http.post(AUTH_API_URL, {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

}
