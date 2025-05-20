import { Injectable } from '@angular/core';
import { AlertType } from './alert.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  alert(component: IAlertableComponent, alertConfig: AlertConfig) {
    component.alertMessage = alertConfig.alertMessage;
    component.alertType = alertConfig.alertType;
    component.isAlertHidden = true;

    setTimeout(() => (component.isAlertHidden = false), alertConfig.duration);
  }

  alertWithSuccess(component: IAlertableComponent, message: String) {
    this.alert(component, new AlertConfig(AlertType.SUCCESS, message, 3000));
  }

  alertWithFailure(component: IAlertableComponent, message: String) {
    this.alert(component, new AlertConfig(AlertType.DANGER, message, 3000));
  }
}

export interface IAlertableComponent {
  alertType: AlertType;
  alertMessage: String;
  isAlertHidden: boolean;
}

export class AlertConfig {
  constructor(
    private _alertType: AlertType,
    private _alertMessage: String,
    private _duration: number
  ) {}

  get alertType(): AlertType {
    return this._alertType;
  }

  get alertMessage(): String {
    return this._alertMessage;
  }

  get duration(): number {
    return this._duration;
  }
}
