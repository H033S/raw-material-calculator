import { Component, input, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  imports: [FaIconComponent, NgIf, FormsModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.css',
})
export class PasswordInputComponent {
  enforcedMinLength = input.required<boolean>();
  enforcedPattern = input.required<boolean>();
  passwordValue = output<String>();
  //
  private _isPasswordEnabled: boolean = true;
  protected readonly faEye = faEye;
  protected readonly faEyeSlash = faEyeSlash;

  switchIsPasswordEnabled() {
    this._isPasswordEnabled = !this._isPasswordEnabled;
  }

  get isPasswordEnabled() {
    return this._isPasswordEnabled;
  }

  set password(value: String) {
    this.passwordValue.emit(value);
  }
}
