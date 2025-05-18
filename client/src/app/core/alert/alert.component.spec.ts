import {Component} from '@angular/core';
import {AlertComponent, AlertType} from './alert.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';

@Component(
  {
    template: `
      <app-alert
        [alertType]="currentAlertType"
        [alertMessage]="currentMessage"
        [isAlertHidden]="isHidden"
      ></app-alert>
    `,
    standalone: true,
    imports: [AlertComponent]
  }
)
class TestComponent {
  currentAlertType = AlertType.PRIMARY;
  currentMessage = "Test alert message";
  isHidden = true;
}

describe("Alert Component", () => {

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent, TestComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set alert type based on alertType', () => {

    //arrange
    component.currentAlertType = AlertType.SECONDARY;
    fixture.detectChanges();
    //
    const alertDiv: HTMLDivElement = fixture.nativeElement.querySelector('div[id="alert-component"]');
    const alertDivClass = alertDiv.getAttribute("class");
    //assert
    expect(alertDivClass).toEqual(AlertType.SECONDARY)
  })

  it('should hide alert when isHidden is true', () => {

    //arrange
    component.isHidden = true;
    fixture.detectChanges();
    //
    const alertDiv: HTMLDivElement = fixture.nativeElement.querySelector('div[id="alert-component"]');
    const isAlertDivVisible = alertDiv.checkVisibility()
    //assert
    expect(isAlertDivVisible).toEqual(false)
  })
})
