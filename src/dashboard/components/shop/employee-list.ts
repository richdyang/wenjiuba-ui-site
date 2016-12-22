import {Component, Input} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {DictService} from "../../../shared/services/dict";

@Component({
  selector: 'employee-list',
  template: `
  <div class="page-header">
      <h4>员工管理</h4>
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
        <button uiSref="shop.employees.new" class="btn btn-primary btn-circle-micro" tooltip="添加" tooltipPlacement="bottom"><i class="wj-icon wj-add"></i></button>
      </caption>
      <thead>
        <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>联系电话</th>
          <th>是否技师？</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let employee of employees">
          <td>{{employee.fullName}}</td>
          <td>{{dict.display('genders', employee.gender)}}</td>
          <td>{{employee.mobile}}</td>
          <td>{{dict.display('yesno', employee.technicianInd)}}</td>
          <td class="text-right">
            <button uiSref="shop.employees.employee.edit" [uiParams]="{employeeId: employee.id}" class="btn btn-default btn-circle-micro" tooltip="修改" tooltipPlacement="bottom">
              <i class="wj-icon wj-edit"></i>
            </button>
          </td>
        </tr>
        
        <tr *ngIf="!employees.length">
            <td colspan="5" class="text-center">
            <p>
                <i class="wj-icon wj-empty3 fa-4x"></i> 
            </p>
            <p>还没有一位员工？</p>
            </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [],
  providers: []
})
export class EmployeeListComponent {
  constructor(private api:ApiService, private dict:DictService) {}

  @Input() employees:any[];

}
