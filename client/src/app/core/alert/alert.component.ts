import {Component, input} from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  alertType = input.required<AlertType>();
  alertMessage = input.required<String>();
  isAlertHidden = input.required<boolean>();
}

export enum AlertType {
  PRIMARY = "alert alert-primary",
  SECONDARY = "alert alert-secondary",
  SUCCESS = "alert alert-success",
  DANGER = "alert alert-danger",
  WARNING = "alert alert-warning",
  INFO = "alert alert-info",
  LIGHt = "alert alert-light",
  DARK = "alert alert-dark"
}
