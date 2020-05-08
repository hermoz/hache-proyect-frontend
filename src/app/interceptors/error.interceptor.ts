import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
import { API_AUTH_ENDPOINT_URL } from '../constants';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private excludedUrlsOfReload: string[] = [
    API_AUTH_ENDPOINT_URL
  ];

  constructor(private tokenStorageService: TokenStorageService) {}

  private isExcludedUrlOfReload(url: string) {
    return this.excludedUrlsOfReload.includes(url);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.tokenStorageService.signOut();
          // If we are not calling to login, we should reload the page
          if (!this.isExcludedUrlOfReload(request.url)) {
            location.reload();
          }
        }

        return throwError(err);
      })
    );
  }

}

export const errorInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }
];