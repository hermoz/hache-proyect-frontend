
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RoleDto } from '../dtos/role-dto';
import { API_ROLES_ENDPOINT_URL } from '../constants';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  /**
   * Get roles using tap to check on console
   */
  getRoles(): Observable<RoleDto[]> {
    return this.http.get<RoleDto[]>(API_ROLES_ENDPOINT_URL)
      .pipe(
        tap(users => console.log('fetched roles')),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
