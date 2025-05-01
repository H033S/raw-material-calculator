import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface LoginCredentials {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials: LoginCredentials = {
    username: '',
    password: '',
  };
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
}
