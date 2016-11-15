import {Component, ViewEncapsulation, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {Transition} from "ui-router-ng2/ng2";
import {DictService} from "../../../shared/services/dict";

@Component({
  selector: 'employee-form',
  template: `
  <div class="page-header">
    <h4>员工信息</h4>
  </div>
  
  <form #employeeForm="ngForm">
    <p-form-field label="员工姓名 *">
      <input type="text" [(ngModel)]="employee.fullName" name="name" class="form-control" required minlength="2">
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
      <input type="text" [(ngModel)]="employee.address" name="address" class="form-control" required minlength="10">
    </p-form-field>
    <p-form-field label="联系电话 *">
      <input type="text" [(ngModel)]="employee.mobile" name="mobile" class="form-control" required minlength="11">
    </p-form-field>
    <p-form-field label="性别 *">
      <p-selectButton [options]="dict.genders" [(ngModel)]="employee.gender" name="gender" required></p-selectButton>
      <!--<input type="radio" [(ngModel)]="employee.gender" value="M" name="gender" required> 男-->
      <!--<input type="radio" [(ngModel)]="employee.gender" value="F" name="gender" required> 女-->
    </p-form-field>
    <p-form-field label="出生日期 *">
      <input type="text" [(ngModel)]="employee.birthday" name="birthday" class="form-control" required placeholder="格式如: 1980-01-01">
    </p-form-field>
    <p-form-field label="实操技师? * ">
      <p-selectButton [options]="dict.yesno" [(ngModel)]="employee.technicianInd" name="technicianInd" required></p-selectButton>
      (<i class="fa fa-question-circle text-info"></i> 实操技师可以对客户进行养生服务）
    </p-form-field>
    <p-form-field label="其他后勤员工? *">
      <p-selectButton [options]="dict.yesno" [(ngModel)]="employee.receptionistInd" name="receptionistInd" required></p-selectButton>
    </p-form-field>
    <p-form-field label="启用该员工? *">
      <p-selectButton [options]="dict.yesno" [(ngModel)]="employee.availableInd" name="availableInd" required></p-selectButton>
    </p-form-field>
    <p-form-field label="设为管理员? *">
      <p-selectButton [options]="dict.yesno" [(ngModel)]="employee.adminInd" name="adminInd" required></p-selectButton>
      (<i class="fa fa-exclamation-triangle text-danger"></i> 管理员拥有极大的权限，请谨慎设置）
    </p-form-field>
    
    <button class="btn btn-primary" [disabled]="!employeeForm.valid" (click)="onSubmit()">保存</button>
  </form>
  <!--{{employee | json}}-->
  `,
  styles: [],
  providers: []
})
export class EmployeeFormComponent {

  constructor(private api:ApiService, private dict: DictService) {}

  static resolve = [
    {
      token: 'employee',
      deps: [ApiService,Transition],
      resolveFn: (api, transition) => api.get(`/shops/default/employees/${transition.params().id}`)
    },
    // for new only
    {
      token: 'stores',
      deps: [ApiService,Transition],
      resolveFn: (api, transition) => api.get(`/shops/default/stores`)
    }
  ]

  // models
  @Input() employee:any= {};
  @Input() stores:any= {};


  private onSubmit() {
    this.api.save('/shops/default/employees', this.employee);
  }

}
