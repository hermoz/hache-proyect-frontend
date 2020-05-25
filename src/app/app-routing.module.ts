import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { UsersDetailComponent } from './components/users-detail/users-detail.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { READ_USERS, CREATE_USERS, READ_PROJECTS, CREATE_CUSTOMERS, READ_CUSTOMERS, CREATE_PROJECTS } from './constants';
import { ProjectsComponent } from './components/projects/projects.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProjectsDetailComponent } from './components/projects-detail/projects-detail.component';
import { CustomersDetailComponent } from './components/customers-detail/customers-detail.component';




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
    path: 'users/new',
    component: UsersDetailComponent,
    data: { requiredPrivileges: [ CREATE_USERS ] },
    canActivate: [AuthGuard]
  },
  {
  path: 'users/:id',
    component: UsersDetailComponent,
    data: { requiredPrivileges: [ READ_USERS ] },
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: { requiredPrivileges: [ READ_PROJECTS ] },
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/new',
    component: ProjectsDetailComponent,
    data: { requiredPrivileges: [ CREATE_PROJECTS ] },
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:id',
    component: ProjectsDetailComponent,
    data: { requiredPrivileges: [ READ_PROJECTS ] },
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    component: CustomersComponent,
    data: { requiredPrivileges: [ READ_CUSTOMERS ] },
    canActivate: [AuthGuard]
  },
  {
    path: 'customers/new',
    component: CustomersDetailComponent,
    data: { requiredPrivileges: [ CREATE_CUSTOMERS ] },
    canActivate: [AuthGuard]
  },
  {
    path: 'customers/:id',
    component: CustomersDetailComponent,
    data: { CustomersDetailComponent: [ READ_CUSTOMERS ] },
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
