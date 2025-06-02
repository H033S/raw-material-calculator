import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  AuthService,
  LoginCredentials,
} from '../core/auth/auth-service.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PasswordInputComponent } from '../core/components/password-input/password-input.component';
import { NgIf } from '@angular/common';
import { AlertService } from '../core/components/alert/alert.service';
import {
  AlertComponent,
  AlertType,
} from '../core/components/alert/alert.component';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    FontAwesomeModule,
    RouterLink,
    RouterLinkActive,
    PasswordInputComponent,
    NgIf,
    AlertComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService],
})
export class LoginComponent {
  @ViewChild('formLogin') formLogin!: NgForm;
  enforcedMinLength = false;
  enforcedPattern = false;
  faFacebook = faFacebook;
  faGoogle = faGoogle;
  credentials: LoginCredentials = {
    email: '',
    password: '',
  };
  authService = inject(AuthService);
  submitted = false;
  //alert
  alertMessage: string = '';
  alertType: AlertType = AlertType.PRIMARY;
  isAlertHidden: boolean = true;

  constructor(private alertService: AlertService) {}

  onSubmit() {
    console.debug('Submitting form');
    this.submitted = true;
    this.authService
      .submitCredentials(this.credentials)
      .subscribe((areCredentialsSubmitted) => {
        if (!areCredentialsSubmitted) {
          this.submitted = false;
          this.alertService.alertWithFailure(
            this,
            `Failed to submit credentials for user: ${this.credentials.email}`
          );
          this.formLogin.resetForm();
        }
      });
  }
}
