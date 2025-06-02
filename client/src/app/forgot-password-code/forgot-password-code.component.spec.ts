import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordCodeComponent } from './forgot-password-code.component';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';

describe('ForgotPasswordCodeComponent', () => {
  let component: ForgotPasswordCodeComponent;
  let fixture: ComponentFixture<ForgotPasswordCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordCodeComponent, RouterModule.forRoot(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
