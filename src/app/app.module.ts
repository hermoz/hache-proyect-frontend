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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    authInterceptorProviders],

  bootstrap: [AppComponent]
})
export class AppModule { }
