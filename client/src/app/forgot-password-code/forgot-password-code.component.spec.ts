import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordCodeComponent } from './forgot-password-code.component';

describe('ForgotPasswordCodeComponent', () => {
  let component: ForgotPasswordCodeComponent;
  let fixture: ComponentFixture<ForgotPasswordCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordCodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
