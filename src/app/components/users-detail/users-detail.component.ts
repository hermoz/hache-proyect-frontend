import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from '../../dtos/user-dto';
import { RolesService } from '../../services/roles.service';
import { RoleDto } from '../../dtos/role-dto';
import { TokenStorageService } from '../../services/token-storage.service';
import { CREATE_USERS, UPDATE_USERS } from '../../constants';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})

/**
 * Users detail is used for all three views for users
 * - New User
 * - User Detail
 * - User Update
 */
export class UsersDetailComponent implements OnInit {

  @Input() user: UserDto;
  roles: RoleDto[];
  isNewUserPage = false;
  isUserDetailPage = false;
  id: number;
  textActionButton: string;
  hasCreateUsersPrivilege: boolean;
  hasUpdateUsersPrivilege: boolean;

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.hasCreateUsersPrivilege = this.tokenStorageService.getPrivileges().has(CREATE_USERS);
    this.hasUpdateUsersPrivilege = this.tokenStorageService.getPrivileges().has(UPDATE_USERS);

    /**
     * Method to subscribe depending ob saving or updating information
     */
    this.route.params.subscribe(params => {
      if (params.id) {
        this.id = +params.id;
        // if we are in a url with an ID not numeric, we redirect to home.
        if (isNaN(this.id)) {
          this.router.navigate(['']);
        } else {
          this.isUserDetailPage = true;
          this.getUser();
          this.textActionButton = 'Save User';
        }
      } else {
        this.isNewUserPage = true;
        this.user = new UserDto();
        this.textActionButton = 'Create User';
      }

      this.getRoles();
    });
  }

  /**
   * Get user
   */
  private getUser() {
    this.usersService.getUser(this.id)
    .subscribe((res: any) => {
      this.user = res;
    }, err => {
      alert(err.error.message);
    });
  }

  /**
   * Get roles
   */
  private getRoles() {
    this.rolesService.getRoles()
    .subscribe((res: any) => {
      this.roles = res;
    }, err => {
      alert(err.error.message);
    });
  }

  compareRoleDto(roleOne: RoleDto, roleTwo: RoleDto) {
    if (roleOne == null || roleTwo == null) {
      return false;
    }
    return roleOne.id === roleTwo.id && roleOne.name === roleTwo.name;
  }

  /**
   * Save modifications on user in both cases:
   * - User creation
   * - User update
   */
  saveUser() {
    if (this.isNewUserPage) {
      this.usersService.createUser(this.user)
      .subscribe((res: any) => {
        alert('new user created successfully');
        this.router.navigate(['/users']);
      }, err => {
        alert(err.error.message);
      });
    } else {
      this.usersService.updateUser(this.user)
      .subscribe((res: any) => {
        alert('user updated successfully');
        this.router.navigate(['/users']);
      }, err => {
        alert(err.error.message);
      });
    }
  }


}
