import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { UsersDetailComponent } from './components/users-detail/users-detail.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { READ_USERS } from './constants';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'users',
    component: UsersComponent,
    data: { requiredPrivileges: [ READ_USERS ] },
    canActivate: [AuthGuard]
  },

  {
  path: 'users/:id',
    component: UsersDetailComponent,
    data: { requiredPrivileges: [ READ_USERS ] },
    canActivate: [AuthGuard]
  },

  // routes that dont exists, we redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
