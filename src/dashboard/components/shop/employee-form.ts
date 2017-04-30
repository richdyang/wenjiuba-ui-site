import {Component, ViewEncapsulation, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {Transition, UIRouter} from "@uirouter/angular";
import {DictService} from "../../../shared/services/dict";

@Component({
  selector: 'employee-form',
  template: `
  <div class="page-header">
    <h4>员工信息</h4>
  </div>
  
  <form #employeeForm="ngForm">
    <p-form-field label="员工姓名 *">
      <input type="text" [(ngModel)]="employee.fullName" name="name" class="form-control" required minlength="2" maxlength="20">
    </p-form-field>
    <p-form-field label="主属门店">
      <select name="primaryStoreId" [(ngModel)]="employee.primaryStoreId" class="form-control">
        <option *ngFor="let store of stores" [value]="store.id">  
        {{store.name}}
        </option>
      </select>
    </p-form-field>
    <p-form-field label="次属门店">
      <select name="secondaryStoreId" [(ngModel)]="employee.secondaryStoreId" class="form-control">
        <option *ngFor="let store of stores" [value]="store.id">  
        {{store.name}}
        </option>
      </select>
    </p-form-field>
    <p-form-field label="联系地址 *">
      <input type="text" [(ngModel)]="employee.address" name="address" class="form-control" required minlength="10" maxlength="60">
    </p-form-field>
    <p-form-field label="邮编 ">
      <input type="text" [(ngModel)]="employee.postcode" name="postcode" class="form-control" maxlength="6">
    </p-form-field>
    <p-form-field label="联系电话 ">
      <input type="text" [(ngModel)]="employee.telephone" name="telephone" class="form-control" maxlength="20">
    </p-form-field>
    <p-form-field label="手机 *">
      <input type="text" [(ngModel)]="employee.mobile" name="mobile" class="form-control" required minlength="11" maxlength="20">
    </p-form-field>
    <p-form-field label="性别 *">
      <p-selectButton [options]="dict.options('genders')" [(ngModel)]="employee.gender" name="gender" required></p-selectButton>
    </p-form-field>
    <p-form-field label="出生日期 *">
      <p-calendar [(ngModel)]="employee.birthday" name="birthday" [maxDate]="today" required></p-calendar>
      <!--<input type="text" [(ngModel)]="employee.birthday" name="birthday" class="form-control" required placeholder="格式如: 1980-01-01">-->
    </p-form-field>
    <p-form-field label="实操技师? * " help="实操技师可以对客户进行养生服务">
      <p-selectButton [options]="dict.options('yesno')" [(ngModel)]="employee.technicianInd" name="technicianInd" required></p-selectButton>
    </p-form-field>
    <p-form-field label="其他后勤员工? *">
      <p-selectButton [options]="dict.options('yesno')" [(ngModel)]="employee.receptionistInd" name="receptionistInd" required></p-selectButton>
    </p-form-field>
    <p-form-field label="启用该员工? *">
      <p-selectButton [options]="dict.options('yesno')" [(ngModel)]="employee.availableInd" name="availableInd" required></p-selectButton>
    </p-form-field>
    <p-form-field label="设为管理员? *" help="管理员拥有极大的权限，请谨慎设置">
      <p-selectButton [options]="dict.options('yesno')" [(ngModel)]="employee.adminInd" name="adminInd" required></p-selectButton>
    </p-form-field>
    
    <button class="btn btn-primary" [disabled]="!employeeForm.valid" (click)="onSubmit()">保存</button>
  </form>
  <!--{{employee | json}}-->
  `,
  styles: [],
  providers: []
})
export class EmployeeFormComponent {

  constructor(private api:ApiService, private dict: DictService, private router: UIRouter) {}

  private today:Date = new Date();

  static resolve_select = [
    {
      token: 'stores',
      deps: [ApiService,Transition],
      resolveFn: (api, transition) => api.get(`/shop/stores`)
    }
  ]

  // models
  @Input() employee:any = {};
  @Input() stores:any = {};


  private onSubmit() {
    this.api.save('/shop/employees', this.employee).then(_ => {
        this.router.stateService.go('shop.employees', null, {reload: 'shop.employees'})
    });
  }

}
