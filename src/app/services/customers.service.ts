import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_CUSTOMERS_ENDPOINT_URL, API_HTTP_OPTIONS } from '../constants';
import { CustomerDto } from '../dtos/customer-dto';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  /**
   * Get projects
   * We use "pipe" over the Observable to catch the error using operator RxJS catchError()
   * Observable can return multiple values, but An HttpClient Observable always emits a single value and ends
   * Tap only registers the operation (on log)
   */
  getCustomers(): Observable<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(API_CUSTOMERS_ENDPOINT_URL)
      .pipe(
        tap(users => console.log('fetched customers')),
        catchError(this.handleError)
      );
  }


  /**
   * Delete project by id
   * Tap to check on console
   * @param id 
   */

  deleteCustomer(id: number): Observable<any> {
    const url = `${API_CUSTOMERS_ENDPOINT_URL}/${id}`;
    return this.http.delete<any>(url, API_HTTP_OPTIONS).pipe(
      tap(_ => console.log(`deleted customer with id=${id}`)),
      catchError(this.handleError)
    );
  }

  /**
   * Get proyect by id
   * @param id
   */
  getCustomer(id: number): Observable<CustomerDto> {
    const url = `${API_CUSTOMERS_ENDPOINT_URL}/${id}`;
    return this.http.get<CustomerDto>(url)
      .pipe(
        tap(customer => console.log(`fetched customer with id ${id}`)),
        catchError(this.handleError)
      );
  }

  /**
   * Create new customer
   * @param customer 
   */
  createCustomer(customer: CustomerDto): Observable<any> {
    return this.http.post(API_CUSTOMERS_ENDPOINT_URL, customer, API_HTTP_OPTIONS).pipe(
      tap(newCustomer => console.log(`customer created successfully: ${newCustomer}`)),
      catchError(this.handleError)
    );
  }

  /**
   * Update customer
   * @param customer 
   */
  updateCustomer(customer: CustomerDto): Observable<any> {
    const url = `${API_CUSTOMERS_ENDPOINT_URL}`;
    return this.http.put(url, customer, API_HTTP_OPTIONS).pipe(
      tap(updatedCustomer => console.log(`customer updated successfully: ${updatedCustomer}`)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}