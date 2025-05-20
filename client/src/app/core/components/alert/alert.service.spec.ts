import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  AlertConfig,
  AlertService,
  IAlertableComponent,
} from './alert.service';
import { Component } from '@angular/core';
import { AlertComponent, AlertType } from './alert.component';

@Component({
  selector: 'alert-service-test',
  imports: [AlertComponent],
  template: ` <app-alert
    [alertMessage]="alertMessage"
    [alertType]="alertType"
    [isAlertHidden]="isAlertHidden"
  ></app-alert>`,
  providers: [AlertService],
})
class AlertServiceTestComponent implements IAlertableComponent {
  alertMessage = '';
  alertType = AlertType.PRIMARY;
  isAlertHidden: boolean = false;
}

describe('AlertService', () => {
  let component: AlertServiceTestComponent;
  let fixture: ComponentFixture<AlertServiceTestComponent>;
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AlertServiceTestComponent] });
    service = TestBed.inject(AlertService);

    fixture = TestBed.createComponent(AlertServiceTestComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const alertTypes: AlertType[] = [
    AlertType.PRIMARY,
    AlertType.SECONDARY,
    AlertType.SUCCESS,
    AlertType.DANGER,
    AlertType.WARNING,
    AlertType.INFO,
    AlertType.LIGHt,
    AlertType.DARK,
  ];
  alertTypes.forEach((alertType) => {
    it(`should change when service creates an alert: ${alertType}`, () => {
      //arrange
      component.isAlertHidden = false;
      component.alertMessage = '';
      component.alertType = alertType;
      fixture.detectChanges();
      const TEST_MESSAGE = 'Success Alert Message';
      //action
      service.alert(component, new AlertConfig(alertType, TEST_MESSAGE, 3000));
      fixture.detectChanges();
      //assert
      expect(component.alertMessage).toEqual(TEST_MESSAGE);
      expect(component.alertType).toEqual(alertType);
      expect(component.isAlertHidden).toBeTrue();
    });
  });
});
