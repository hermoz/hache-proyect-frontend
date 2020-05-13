import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private tokenStorageService: TokenStorageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.tokenStorageService.getUser()) {
        const requiredPrivileges: Array<string> = next.data.requiredPrivileges || [];
        const userPrivileges = this.tokenStorageService.getPrivileges();

        for (const requiredPrivilege of requiredPrivileges) {
          if (!userPrivileges.has(requiredPrivilege)) {
            this.router.navigate(['']);
            return false;
          }
        }

        // logged in and it has the required privileges, so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
