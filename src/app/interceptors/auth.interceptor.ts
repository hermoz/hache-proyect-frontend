import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenStorageService } from '../services/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

/**
 * HttpInterceptor has intercept() method to inspect and transform HTTP requests before they are sent to server
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService) {}
  /**
   * Inspects and transform HTTP requests before they are sent to the server
   */
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let authRequest = request;
    const token = this.tokenStorageService.getToken();
    if (token != null) {
      authRequest = request.clone({
        /* Bearer is added to the token */
        headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
      });
    }
    return next.handle(authRequest);
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
];
