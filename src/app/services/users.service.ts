import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserDto } from '../dtos/user-dto';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { API_USERS_ENDPOINT_URL, API_AUTH_ENDPOINT_URL, API_HTTP_OPTIONS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  /**
   * Get list of users
   * We use "pipe" over the Observable to catch the error using operator RxJS catchError()
   * Observable can return multiple values, but An HttpClient Observable always emits a single value and ends
   * Tap only registers the operation (on log)
   */
  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(API_USERS_ENDPOINT_URL)
      .pipe(
        tap(users => console.log('fetched users')),
        catchError(this.handleError)
      );
  }

  /**
   * Delete user by id calls HttpClient.delete.
   * The URL is the URL of the hero resource plus the hero id to delete
   * (we keep sending httpOptions)
   * @param id 
   */
  deleteUser(id: number): Observable<any> {
    const url = `${API_USERS_ENDPOINT_URL}/${id}`;
    return this.http.delete<any>(url, API_HTTP_OPTIONS).pipe(
      tap(_ => console.log(`deleted user with id=${id}`)),
      catchError(this.handleError)
    );
  }

  /**
   * The following handleError() method reports the error and returns a harmless result
   * so that the application continues to function
   * @param error 
   */
  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
