import {Component, Input} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {DictService} from "../../../shared/services/dict";

@Component({
  selector: 'customer-list',
  template: `
  <div class="page-header">
      <h4>客户管理</h4>
      <div class="pull-right">
          <button uiSref="shop.overview" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="店务管理" tooltipPlacement="bottom"><i class="wj-icon wj-shop"></i></button>
          <button uiSref="shop.stores" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="门店管理" tooltipPlacement="bottom"><i class="wj-icon wj-store"></i></button>
          <button uiSref="shop.employees" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="员工管理" tooltipPlacement="bottom"><i class="wj-icon wj-employee"></i></button>
          <button uiSref="shop.products" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="产品管理" tooltipPlacement="bottom"><i class="wj-icon wj-product"></i></button>
          <button uiSref="shop.customers" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="客户管理" tooltipPlacement="bottom"><i class="wj-icon wj-customer"></i></button>
          <button uiSref="shop.records" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="灸例管理" tooltipPlacement="bottom"><i class="wj-icon wj-record"></i></button>
          <button uiSref="shop.records" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="健康档案" tooltipPlacement="bottom"><i class="wj-icon wj-health-record"></i></button>
      </div>
  </div>

    <table class="table table-striped table-hover">
      <caption class="text-right">
        <button uiSref="shop.customers.new" class="btn btn-primary btn-circle-micro" tooltip="添加" tooltipPlacement="bottom"><i class="wj-icon wj-add"></i></button>
      </caption>
      <thead>
        <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>联系电话</th>
          <th>住址</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let customer of customers">
          <td>{{customer.fullName}}</td>
          <td>{{dict.display('genders', customer.gender)}}</td>
          <td>{{customer.mobile}}</td>
          <td>{{customer.address}}</td>
          <td class="text-right">
            <button uiSref="shop.customers.customer.edit" [uiParams]="{customerId: customer.id}" class="btn btn-default btn-circle-micro" tooltip="修改" tooltipPlacement="bottom">
              <i class="wj-icon wj-edit"></i>
            </button>
            <button uiSref="shop.customers.customer.account" [uiParams]="{customerId: customer.id}" class="btn btn-default btn-circle-micro" tooltip="钱包" tooltipPlacement="bottom">
              <i class="wj-icon wj-wallet"></i>
            </button>
          </td>
        </tr>
        
        <tr *ngIf="!customers.length">
            <td colspan="5" class="text-center">
            <p>
                <i class="wj-icon wj-empty3 fa-4x"></i> 
            </p>
            <p>还没有一位客户？</p>
            </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [],
  providers: []
})
export class CustomerListComponent {
  constructor(private api:ApiService, private dict:DictService) {}

  static resolve = [
    {
      token: 'customers',
      deps: [ApiService],
      resolveFn: (api) => api.get('/shop/customers')
    }
  ]

  @Input() customers:any[];

}
