import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

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

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.roles = this.tokenStorageService.getRoles();
      this.privileges = this.tokenStorageService.getPrivileges();
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    // TODO: We should redirect to home instead reload?
    location.reload();
  }
}
