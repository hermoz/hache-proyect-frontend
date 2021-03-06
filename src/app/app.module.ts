import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { errorInterceptorProviders } from './interceptors/error.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { UsersDetailComponent } from './components/users-detail/users-detail.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProjectsDetailComponent } from './components/projects-detail/projects-detail.component';
import { CustomersDetailComponent } from './components/customers-detail/customers-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    UsersDetailComponent,
    ProjectsComponent,
    CustomersComponent,
    ProjectsDetailComponent,
    ProjectsDetailComponent,
    CustomersDetailComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    authInterceptorProviders,
    AuthGuard, 
    errorInterceptorProviders],

  bootstrap: [AppComponent]
})
export class AppModule { }
