import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../dtos/user-dto';
import { UsersService } from '../../services/users.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { DELETE_USERS, CREATE_USERS } from '../../constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  columns: string[] = [
    'id', 'username', 'name', 'lastname', 'email'
  ];

  users: UserDto[];
  currentUserId = null;

  hasCreateUsersPrivilege = false;
  hasDeleteUsersPrivilege = false;

  constructor(private usersService: UsersService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUserId = this.tokenStorageService.getUser().id;
    this.hasCreateUsersPrivilege = this.tokenStorageService.getPrivileges().has(CREATE_USERS);
    this.hasDeleteUsersPrivilege = this.tokenStorageService.getPrivileges().has(DELETE_USERS);
    this.getUsers();
  }

  /**
   * Get all users
   */
  getUsers() {
    this.usersService.getUsers()
    .subscribe((res: any) => {
      this.users = res;
    }, err => {
      this.users = [];
      alert(err.error.message);
    });
  }

  /**
   * Delete user by id after confirming
   * @param id 
   */
  deleteUser(id: number) {
    const agreeDelete = confirm(`Are you sure to delete the user with id ${id}`);
    if (agreeDelete === true) {
      this.usersService.deleteUser(id)
      .subscribe((res: any) => {
        console.log(`User deleted with id ${id}`);
        // if delete is ok, we update the users list;
        this.getUsers();
      }, err => {
        alert(err.error.message);
      });
    }
  }


}
