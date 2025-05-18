import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthService, LoginCredentials } from './auth-service.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService],
})
export class LoginComponent {
  faFacebook = faFacebook;
  faGoogle = faGoogle;
  credentials: LoginCredentials = {
    email: '',
    password: '',
  };
  authService = inject(AuthService);
  submitted = false;

  onSubmit() {
    console.debug('Submitting form');
    this.submitted = true;
    this.authService.submitCredentials(this.credentials);
  }
}
