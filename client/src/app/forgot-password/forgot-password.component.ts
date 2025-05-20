import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../login/auth-service.service';
import {
  AlertComponent,
  AlertType,
} from '../core/components/alert/alert.component';
import {
  AlertService,
  IAlertableComponent,
} from '../core/components/alert/alert.service';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, AlertComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  providers: [AuthService],
})
export class ForgotPasswordComponent implements OnInit, IAlertableComponent {
  submitted: boolean = false;
  email: string = '';
  authService: AuthService = inject(AuthService);
  alertMessage: String = '';
  alertType: AlertType = AlertType.PRIMARY;
  isAlertHidden: boolean = true;

  constructor(private alertService: AlertService) {}

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
          this.alertService.alertWithSuccess(
            this,
            `Mail was sent to ${this.email} to change the password`
          );
        } else {
          console.debug('failing with alert');
          this.alertService.alertWithFailure(
            this,
            `Mail was not sent to ${this.email}`
          );
        }
      });
  }

  clearAlert() {
    this.alertMessage = '';
    this.alertType = AlertType.PRIMARY;
    this.isAlertHidden = true;
  }
}
