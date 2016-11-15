import {Component, Input, ElementRef, ContentChild, NgModule} from '@angular/core';
import {AbstractControl,NgControl} from '@angular/forms';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'p-form-field',
  template: `
    <div 
        [ngClass]="{'form-group':label,'has-error': label && isStateInvalid(),'has-feedback':feedback}">
      <label *ngIf="label" for="for"
         class="control-label" [ngClass]="{'col-sm-8': horizontal, 'col-md-8': horizontal}">{{label}}</label>

      <div [ngClass]="{'col-sm-8': horizontal && label, 'col-md-8': horizontal && label}">
        <ng-content ></ng-content>
        <span *ngIf="isFeedbackValid()" 
              class="glyphicon glyphicon-ok form-control-feedback text-success"
              aria-hidden="true"></span>
        <span *ngIf="isFeedbackNotValid()"
              class="glyphicon glyphicon-remove form-control-feedback"
              aria-hidden="true"></span>
        <span *ngIf="isFeedbackPending()"
              class="glyphicon glyphicon-refresh glyphicon-refresh-animate text-muted form-control-feedback"
              aria-hidden="true"></span>
        <span *ngIf="isStateInvalid()" class="help-block text-danger" style="font-size: .9em">
          <div *ngIf="formControl?.errors?.required">此项为必填</div>
          <div *ngIf="formControl?.errors?.minlength">此项小于字数{{formControl?.errors?.minlength?.requiredLength}}</div>
          <div *ngIf="formControl?.errors?.remote">{{formControl?.errors?.remote}}</div>
          <div *ngIf="formControl?.errors?.notEmpty">The list can't be empty</div>
          <div *ngIf="formControl?.errors?.uniqueName">The name must be unique</div>
          <div *ngIf="formControl?.errors?.invalidZip">The zip code format isn't correct</div>
        </span>
      </div>
    </div>
  `,
  styles: [
    `.glyphicon-refresh-animate {
      -animation: spin .7s infinite linear;
      -webkit-animation: spin2 .7s infinite linear;
    }`,
    `@-webkit-keyframes spin2 {
      from { -webkit-transform: rotate(0deg);}
      to { -webkit-transform: rotate(360deg);}
    }`
  ]
})
export class FormField {
  @Input()
  label: string;

  @Input()
  feedback: boolean = false;

  @Input()
  horizontal = false;

  // formControlName and formControl must be have one
  // NgControl is the super class of FormControlName and FormControlDirective
  @ContentChild(NgControl) ngControl:NgControl;

  private _formControl:AbstractControl;
  get formControl():AbstractControl {
    return !this._formControl && this.ngControl ? this.ngControl.control : this._formControl;
  }

  constructor() {}

  isStateInvalid() {
    return this.formControl && !this.formControl.valid && !this.formControl.pending;
  }

  isFeedbackValid() {
    return this.feedback && this.formControl && !this.formControl.pending && this.formControl.valid;
  }

  isFeedbackNotValid() {
    return this.feedback && this.formControl && !this.formControl.pending && !this.formControl.valid;
  }

  isFeedbackPending() {
    return this.feedback && this.formControl && this.formControl.pending;
  }

}

@NgModule({
  imports: [CommonModule],
  exports: [FormField],
  declarations: [FormField]
})
export class FormFieldModule { }
