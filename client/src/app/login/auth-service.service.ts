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

    console.debug(`Preparing to make request for user: ${loginRequest.email}`)
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
        const token = res.body;
        if (token) {
          localStorage.setItem(loginRequest.email, token)
        } else {

          console.error("Token was not provided in response")
          throw new Error("Token was not provided in response")
        }

      });
  }
}
