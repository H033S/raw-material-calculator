import { Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ForgotPasswordCodeComponent } from './forgot-password-code/forgot-password-code.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },
  { path: 'auth/forgot-password-code', component: ForgotPasswordCodeComponent },
  { path: 'auth/login', component: LoginComponent },
];
