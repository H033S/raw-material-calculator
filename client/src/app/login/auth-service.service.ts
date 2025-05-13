import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

export interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);

  submitCredentials(loginRequest: LoginCredentials) {
    console.log('Environment ' + environment.API_BASE_URL);
    this.http
      .post(`${environment.API_BASE_URL}/api/v1/auth/login`, loginRequest,
        {
          responseType: "text",
          headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
          },
          observe: 'response',
        })
      .subscribe((res) => {
        console.log('Response status ', res.status);
        console.log('Response body ', res.body);
      });
  }
}
