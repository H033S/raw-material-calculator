import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ForgotPasswordComponent} from './forgot-password.component';
import {RouterModule} from '@angular/router';
import {routes} from '../app.routes';
import {AuthService} from '../login/auth-service.service';
import {HttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  let mockAuthService = jasmine.createSpyObj(AuthService,
    ["submitCredentials"])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ForgotPasswordComponent,
        RouterModule.forRoot(routes)
      ],
      providers: [
        {provide: AuthService, useValue: mockAuthService},
        {provide: HttpClient, useValue: provideHttpClientTesting()}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
