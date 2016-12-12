import {Component, Input} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {DictService} from "../../../shared/services/dict";

@Component({
  selector: 'customer-list',
  template: `
  <div class="page-header">
      <h4>客户管理</h4>
      <div class="pull-right">
          <a href uiSref="shop-outline" class="btn btn-default btn-circle" uiSrefActive="btn-primary"><i class="wj-icon wj-shop"></i></a>
          <a href uiSref="shop-stores" class="btn btn-default btn-circle" uiSrefActive="btn-primary"><i class="wj-icon wj-store"></i></a>
          <a href uiSref="shop-employees" class="btn btn-default btn-circle" uiSrefActive="btn-primary"><i class="wj-icon wj-employee"></i></a>
          <a href uiSref="shop-products" class="btn btn-default btn-circle" uiSrefActive="btn-primary"><i class="wj-icon wj-product"></i></a>
          <a href uiSref="shop-customers" class="btn btn-default btn-circle" uiSrefActive="btn-primary"><i class="wj-icon wj-customer"></i></a>
          <a href uiSref="shop-records" class="btn btn-default btn-circle" uiSrefActive="btn-primary"><i class="wj-icon wj-record"></i></a>
          <a href uiSref="shop-records" class="btn btn-default btn-circle" uiSrefActive="btn-primary"><i class="wj-icon wj-health-record"></i></a>
      </div>
  </div>

    <table class="table table-striped table-hover">
      <caption class="text-right">
        <a href uiSref="shop-customers.new" class="btn btn-primary btn-circle-sm"><i class="fa fa-plus"></i></a>
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
            <button uiSref="shop-customers.edit" [uiParams]="{id: customer.id}" class="btn btn-default btn-circle-sm" title="修改">
              <i class="fa fa-pencil"></i>
            </button>
            <button uiSref="shop-customers.account" [uiParams]="{id: customer.id}" class="btn btn-default btn-circle-sm" title="修改">
              <i class="fa fa-money"></i>
            </button>
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
