import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

/**
 * This service manages token and user information
 * inside Browser´s Session Storage. Session is cleared after logging out
 */

/* Constants declaration*/
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUserFromToken(token: string) {
    const decoded = jwt_decode(token);
    const user = decoded.user;
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public getRoles() {
    return this.getUser().roles;
  }

  public getPrivileges(): Set<string> {
    const privileges = new Set<string>();
    for (const role of this.getRoles()) {
      for (const privilege of role.privileges) {
        privileges.add(privilege);
      }
    }
    return privileges;
  }

}
