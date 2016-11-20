import {Component, ViewEncapsulation, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {Transition} from "ui-router-ng2/ng2";
import {DictService} from "../../../shared/services/dict";

@Component({
  selector: 'customer-form',
  template: `
  <div class="page-header">
    <h4>客户信息</h4>
  </div>
  
  <form #customerForm="ngForm">
    <p-form-field label="客户姓名 *">
      <input type="text" [(ngModel)]="customer.fullName" name="name" class="form-control" required minlength="2">
    </p-form-field>
    <p-form-field label="主属门店">
      <select name="primaryStoreId" [(ngModel)]="customer.primaryStoreId" class="form-control">
        <option *ngFor="let store of stores" [value]="store.id">  
        {{store.name}}
        </option>
      </select>
    </p-form-field>
    <p-form-field label="次属门店">
      <select name="secondaryStoreId" [(ngModel)]="customer.secondaryStoreId" class="form-control">
        <option *ngFor="let store of stores" [value]="store.id">  
        {{store.name}}
        </option>
      </select>
    </p-form-field>
    <p-form-field label="联系地址 *">
      <input type="text" [(ngModel)]="customer.address" name="address" class="form-control" required minlength="10">
    </p-form-field>
    <p-form-field label="联系电话 *">
      <input type="text" [(ngModel)]="customer.mobile" name="mobile" class="form-control" required minlength="11">
    </p-form-field>
    <p-form-field label="性别 *">
      <p-selectButton [options]="dict.options('genders')" [(ngModel)]="customer.gender" name="gender" required></p-selectButton>
    </p-form-field>
    <p-form-field label="出生日期 *">
      <p-calendar [(ngModel)]="customer.birthday" name="birthday" [maxDate]="today" required></p-calendar>
    </p-form-field>
    <p-form-field label="身高 " help="身高、体重等数据对于健康档案很重要">
        <input type="number" [(ngModel)]="customer.height" name="height" class="form-control">
    </p-form-field>
    <p-form-field label="体重 ">
        <input type="number" [(ngModel)]="customer.weight" name="weight" class="form-control">
    </p-form-field>
    <p-form-field label="月经情况?" *ngIf="customer.gender === 'F'" help="以下这类隐私数据对于e络通辩证可能有用">
      <p-selectButton [options]="dict.options('menses')" [(ngModel)]="customer.menses" name="menses" required></p-selectButton>
    </p-form-field>
    <p-form-field label="血压（高） ">
        <input type="number" [(ngModel)]="customer.bpHigh" name="bpHigh" class="form-control">
    </p-form-field>
    <p-form-field label="血压（低） ">
        <input type="number" [(ngModel)]="customer.bpLow" name="bpLow" class="form-control">
    </p-form-field>
    <p-form-field label="启用该员工? *">
      <p-selectButton [options]="dict.options('yesno')" [(ngModel)]="customer.availableInd" name="availableInd" required></p-selectButton>
    </p-form-field>
    
    <button class="btn btn-primary" [disabled]="!customerForm.valid" (click)="onSubmit()">保存</button>
  </form>
  <!--{{customer | json}}-->
  `,
  styles: [],
  providers: []
})
export class CustomerFormComponent {

  constructor(private api:ApiService, private dict: DictService) {}

  private today:Date = new Date();

  static resolve = [
    {
      token: 'customer',
      deps: [ApiService,Transition],
      resolveFn: (api, transition) => api.get(`/shops/default/customers/${transition.params().id}`)
    },
    // for new only
    {
      token: 'stores',
      deps: [ApiService,Transition],
      resolveFn: (api, transition) => api.get(`/shops/default/stores`)
    }
  ]

  // models
  @Input() customer:any = {};
  @Input() stores:any = {};


  private onSubmit() {
    this.api.save('/shops/default/customers', this.customer);
  }

}
