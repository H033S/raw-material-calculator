import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../login/auth-service.service';
import { Router } from '@angular/router';
import { AlertComponent, AlertType } from '../core/components/alert/alert.component';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, AlertComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  providers: [AuthService],
})
export class ForgotPasswordComponent implements OnInit {
  submitted: boolean = false;
  email: string = '';
  authService: AuthService = inject(AuthService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.clearAlert();
  }

  onSubmit() {
    console.debug('submitting password change request');
    const isPasswordRequestedSubmitted = this.authService
      .submitForgotPasswordRequest(this.email)
      .subscribe((isPasswordRequestedSubmitted) => {
        console.debug(`started the alert ${isPasswordRequestedSubmitted}`);
        if (isPasswordRequestedSubmitted) {
          console.debug('success with alert');
          this.alertWithSuccess(
            `Mail was sent to ${this.email} to change the password`
          );
        } else {
          console.debug('failing with alert');
          this.alertWithFailure(`Mail was not sent to ${this.email}`);
        }
      });
  }

  clearAlert() {
    this.alertMessage = '';
    this.alertType = AlertType.PRIMARY;
    this.isAlertHidden = true;
  }

  //Alert Stuff
  alertMessage: String = '';
  alertType: AlertType = AlertType.PRIMARY;
  isAlertHidden: boolean = true;

  alert(message: String, type: AlertType, duration: number) {
    this.isAlertHidden = false;
    this.alertMessage = message;
    this.alertType = type;

    setTimeout(() => (this.isAlertHidden = true), duration);
  }

  alertWithSuccess(message: String) {
    this.alert(message, AlertType.SUCCESS, 3000);
  }

  alertWithFailure(message: String) {
    this.alert(message, AlertType.DANGER, 3000);
  }
}
