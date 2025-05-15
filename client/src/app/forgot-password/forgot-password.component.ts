import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../login/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [
    FormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  providers: [AuthService]
})
export class ForgotPasswordComponent {
  submitted: boolean = false;
  email: string = "";
  authService: AuthService = inject(AuthService);

  constructor(private router: Router) {
  }

  onSubmit() {

    console.debug("Submitting Password Change Request")
    const isPasswordRequestedSubmitted = this.authService
      .submitForgotPasswordRequest(this.email)
      .subscribe(isPasswordRequestedSubmitted => {
        if (isPasswordRequestedSubmitted) {
          console.debug("Request was made correctly")
          this.router.navigateByUrl("auth/forgot-password-code")
        } else {
          console.error(`Could not process request for user: ${this.email}`);
          throw new Error(`Could not process request for user: ${this.email}`);
        }
      })
  }
}
