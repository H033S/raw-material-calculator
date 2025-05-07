import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { LoginCredentials, LoginService } from './auth-service.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [LoginService],
})
export class LoginComponent {
  faFacebook = faFacebook;
  faGoogle = faGoogle;
  credentials: LoginCredentials = {
    email: '',
    password: '',
  };
  loginService = inject(LoginService);
  submitted = false;

  onSubmit() {
    console.log('submitting creds');
    this.submitted = true;

    console.log('calling service to make post request');
    this.loginService.submitCredentials(this.credentials);
  }
}
