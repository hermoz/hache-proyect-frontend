import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { Router } from '@angular/router';
import { READ_CUSTOMERS, READ_USERS, READ_PROJECTS } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hache-proyect';
  private roles: string[];
  private privileges: Set<string>;
  isLoggedIn = false;
  username: string;
  /**
   * Adding conditional rendering depending on user
   */
  canShowUsersSection = false;
  canShowProjectsSection = false;
  canShowCustomersSection = false;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    /**
     * First check isLoggedIn status using TokenStorageService
     * In case it is true: we get User´s username,role and privileges
     */
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.roles = this.tokenStorageService.getRoles();
      this.privileges = this.tokenStorageService.getPrivileges();
      // Section rendering depending on user
      this.canShowUsersSection = this.privileges.has(READ_USERS);
      this.canShowProjectsSection = this.privileges.has(READ_PROJECTS);
      this.canShowCustomersSection = this.privileges.has(READ_CUSTOMERS);
    }
  }

  /**
   * Log out from app and reloading page
   */
  logout() {
    this.tokenStorageService.signOut();
    // TODO: We should redirect to home instead reload?
    this.router.navigateByUrl('');
  }
}
