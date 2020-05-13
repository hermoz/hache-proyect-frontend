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
   * Get users by id using pipe and registering operations
   * @param id 
   */
  getUser(id: number): Observable<UserDto> {
    const url = `${API_USERS_ENDPOINT_URL}/${id}`;
    return this.http.get<UserDto>(url)
      .pipe(
        tap(user => console.log(`fetched user with id ${id}`)),
        catchError(this.handleError)
      );
  }

    /**
     * Delete user by id calls HttpClient.delete.
     * The URL is the URL of the user plus user id
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
   * Update User - http.post to persist created user on server
   * @param user 
   */
  createUser(user: UserDto): Observable<any> {
    return this.http.post(API_USERS_ENDPOINT_URL, user, API_HTTP_OPTIONS).pipe(
      tap(newUser => console.log(`user created successfully: ${newUser}`)),
      catchError(this.handleError)
    );
  }

  /**
   * Update User - http.put to persist modified user on server
   * @param user 
   */
  updateUser(user: UserDto): Observable<any> {
    const url = `${API_USERS_ENDPOINT_URL}`;
    return this.http.put(url, user, API_HTTP_OPTIONS).pipe(
      tap(updatedUser => console.log(`user updated successfully: ${updatedUser}`)),
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
