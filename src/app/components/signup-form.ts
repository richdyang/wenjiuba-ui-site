import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {ApiService} from "../../shared/services/api";
import {UIRouter} from "ui-router-ng2/ng2";

@Component({
  selector: 'signup-form',
  template: `
<div class="container">
  <main class="row">
  <div class="panel col-sm-12" style="margin-top: 20px">
    <div class="panel-body">
  
  <form [formGroup]="signupForm" class="form-horizontal">
      <div class="form-group">
        <!--<label for="userName" class="col-sm-3 control-label sr-only">用户名</label>-->
        <div class="col-sm-offset-3 col-sm-6" [ngClass]="{'has-error': !signupForm.valid}">
          <input type="text" class="form-control" formControlName="userName" [(ngModel)]="user.userName" placeholder="用户名" 
                 required minlength="6" maxlength="50" pattern="[a-zA-Z][0-9a-zA-Z]+">
          <span *ngIf="!signupForm.valid" class="help-block text-danger" style="font-size: .9em">
            <div *ngIf="signupForm.controls['userName'].errors?.required">此项为必填</div>
            <div *ngIf="signupForm.controls['userName'].errors?.minlength">此项小于字数{{signupForm.controls['userName'].errors?.minlength?.requiredLength}}</div>
            <div *ngIf="signupForm.controls['userName'].errors?.maxlength">此项大于字数{{signupForm.controls['userName'].errors?.maxlength?.requiredLength}}</div>
            <!--<div *ngIf="signupForm.controls['userName'].errors?.invalidUserName">用户名只能使用字母, .或_</div>-->
            <div *ngIf="signupForm.controls['userName'].errors?.pattern">用户名只能使用字母, .或_</div>
          </span>
        </div>
      </div>
      <div class="form-group">
        <!--<label for="password" class="col-sm-3 control-label sr-only">密码</label>-->
        <div class="col-sm-offset-3 col-sm-6" [ngClass]="{'has-error': !signupForm.valid}">
          <input type="password" class="form-control" formControlName="password" [(ngModel)]="user.password" placeholder="密码"
                 required minlength="6" maxlength="50">
          <span *ngIf="!signupForm.valid" class="help-block text-danger" style="font-size: .9em">
            <div *ngIf="signupForm.controls['password'].errors?.required">此项为必填</div>
            <div *ngIf="signupForm.controls['password'].errors?.minlength">此项小于字数{{signupForm.controls['password'].errors?.minlength?.requiredLength}}</div>
            <div *ngIf="signupForm.controls['password'].errors?.maxlength">此项大于字数{{signupForm.controls['password'].errors?.maxlength?.requiredLength}}</div>
          </span>
        </div>
      </div>
      
      <div class="form-group">
        <div class="col-sm-offset-3 col-sm-6" [ngClass]="{'has-error': !signupForm.valid}">
          <input type="email" class="form-control" formControlName="email" [(ngModel)]="user.email" placeholder="邮箱"
                 required pattern="[a-zA-Z][a-zA-Z0-9._]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+">
          <span *ngIf="!signupForm.valid" class="help-block text-danger" style="font-size: .9em">
            <div *ngIf="signupForm.controls['email'].errors?.required">此项为必填</div>
            <div *ngIf="signupForm.controls['email'].errors?.pattern">请输入正确的邮箱格式</div>
          </span>
        </div>
      </div>
      
      <div class="form-group">
        <div class="col-sm-offset-3 col-sm-6" [ngClass]="{'has-error': !signupForm.valid}">
          <input type="text" class="form-control" formControlName="realName" [(ngModel)]="user.realName" placeholder="姓名"
                 >
        </div>
      </div>
      
      <div class="form-group">
        <div class="col-sm-offset-3 col-sm-6">
          <input type="tel" class="form-control" formControlName="mobile" [(ngModel)]="user.mobile" placeholder="手机"
                 >
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-3 col-sm-6">
          <button type="submit" class="btn btn-info col-xs-12" (click)="onSubmit()"
                  [disabled]="!signupForm.valid">注册
          </button>
        </div>
      </div>
    </form>
    
    </div>
    </div>
    </main>
    </div>
  `,
  styles: [],
  providers: []
})
export class SignupForm {
  signupForm:FormGroup;
  user: any = {};

  @Output()
  logined: EventEmitter<boolean>;

  constructor(fb: FormBuilder, private apiService:ApiService, private router: UIRouter) {
    this.signupForm = fb.group({
      userName: [''],
      password: [''],
      email: [''],
      realName: [''],
      mobile: ['']
    });
    this.logined = new EventEmitter<boolean>();
  }

  userNameValidator(control: FormControl): { [key: string]: any } {
    if(Validators.required(control)) {
      return null;
    }
    console.log(control.value)
    console.log(control.value.match(/^[a-zA-Z][0-9a-zA-Z]+$/))
    if (!control.value.match(/^[a-zA-Z][0-9a-zA-Z]+$/)) {
      return {invalidUserName: {validUserName: '用户名只能使用字母, .或_'}};
    }
  }

  onSubmit() {
    this.apiService.post('/signup', this.user).then(() => {
      this.router.stateService.go('welcome');
    });
  }
}
