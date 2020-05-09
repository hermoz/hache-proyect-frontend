import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

/**
 * Login Componentuses AuthService to work with Observable object. 
 * It calls TokenStorageService methods to check loggedIn status and 
 * save Token, User info to Session Storage.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: object[] = [];
  // we use a set because we dont want repeated privilege values from different roles.
  privileges: Set<string> = new Set([]);
  username: string;

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getRoles();
      this.privileges = this.tokenStorageService.getPrivileges();
      this.username = this.tokenStorageService.getUser().username;

      this.redirectToHome();
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUserFromToken(data.token);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getRoles();
        this.privileges = this.tokenStorageService.getPrivileges();
        this.username = this.tokenStorageService.getUser().username;
         // redirect home after successfull login
        this.redirectToHome();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  redirectToHome() {
    location.href = '/';
  }	  
}