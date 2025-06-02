import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AlertComponent,
  AlertType,
} from '../core/components/alert/alert.component';
import { PasswordInputComponent } from '../core/components/password-input/password-input.component';
import { AuthService } from '../core/auth/auth-service.service';

@Component({
  selector: 'app-forgot-password-code',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AlertComponent,
    PasswordInputComponent,
  ],
  templateUrl: './forgot-password-code.component.html',
  styleUrl: './forgot-password-code.component.css',
})
export class ForgotPasswordCodeComponent {
  private _email: String = '';
  private _token: String = '';
  private _password: String = '';
  private _passwordConfirmed: String = '';
  private _alertMessage: String = '';
  private _alertType: AlertType = AlertType.PRIMARY;
  private _isAlertHidden: boolean = true;
  //
  credentials: ForgotPasswordCredentials = {
    password: '',
    passwordConfirmation: '',
  };

  constructor(
    private _router: Router,
    private _routes: ActivatedRoute,
    private _authService: AuthService
  ) {
    this.enableQueryMapSubscription();
  }

  private enableQueryMapSubscription() {
    this._routes.queryParamMap.subscribe((params) => {
      this._email = params.get('email') || '';
      this._token = params.get('token') || '';

      if (this._email === '' || this._token === '') {
        this.alertWithSuccess('Missing email or token');
      }
    });
  }

  alert(message: String, type: AlertType, duration: number) {
    this._isAlertHidden = false;
    this._alertMessage = message;
    this._alertType = type;

    setTimeout(() => (this._isAlertHidden = true), duration);
  }

  alertWithSuccess(message: String) {
    this.alert(message, AlertType.SUCCESS, 3000);
  }

  alertWithFailure(message: String) {
    this.alert(message, AlertType.DANGER, 3000);
  }

  setPassword(value: String) {
    this._password = value;
  }

  setPasswordConfirmed(value: String) {
    this._passwordConfirmed = value;
  }

  get alertMessage(): String {
    return this._alertMessage;
  }

  get alertType(): AlertType {
    return this._alertType;
  }

  get isAlertHidden(): boolean {
    return this._isAlertHidden;
  }

  onSubmit() {
    console.debug('submitting forgot password code request');
    const forgotPasswordCodeRequest: ForgotPasswordCodeRequest = {
      email: this._email,
      code: this._token,
      password: this._password,
      passwordConfirmation: this._passwordConfirmed,
    };

    this._authService
      .submitForgotPasswordCodeRequest(forgotPasswordCodeRequest)
      .subscribe((isPasswordChanged) => {
        if (isPasswordChanged) {
          console.debug(`Password for ${this._email} was changed successfully`);
        } else {
          console.debug('failing with alert');
          this.alertWithFailure(`Password for ${this._email} was not changed`);
        }
      });
  }
}

interface ForgotPasswordCredentials {
  password: String;
  passwordConfirmation: String;
}

export interface ForgotPasswordCodeRequest {
  email: String;
  code: String;
  password: String;
  passwordConfirmation: String;
}
