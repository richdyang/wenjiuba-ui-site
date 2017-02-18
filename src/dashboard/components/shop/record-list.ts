import {Component, Input} from '@angular/core';
import {ApiService} from "../../../shared/services/api";

@Component({
    selector: 'record-list',
    template: `
    <div class="page-header">
      <h4>灸历管理</h4>
      <div class="pull-right">
          <button uiSref="shop.overview" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="店务管理" placement="bottom"><i class="wj-icon wj-shop"></i></button>
          <button uiSref="shop.stores" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="门店管理" placement="bottom"><i class="wj-icon wj-store"></i></button>
          <button uiSref="shop.employees" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="员工管理" placement="bottom"><i class="wj-icon wj-employee"></i></button>
          <button uiSref="shop.products" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="产品管理" placement="bottom"><i class="wj-icon wj-product"></i></button>
          <button uiSref="shop.customers" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="客户管理" placement="bottom"><i class="wj-icon wj-customer"></i></button>
          <button uiSref="shop.records" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="灸历管理" placement="bottom"><i class="wj-icon wj-record"></i></button>
          <!--<button uiSref="shop.records" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="健康档案" placement="bottom"><i class="wj-icon wj-health-record"></i></button>-->
      </div>
    </div>
  
    
    
    <table class="table table-striped table-hover">
        <caption class="text-right">
            <button uiSref="shop.records.new" class="btn btn-primary btn-circle-micro" tooltip="添加" placement="bottom"><i class="wj-icon wj-add"></i></button>
        </caption>
        <thead>
        <tr>
            <th>客户</th>
            <th>分店</th>
            <th>时间段</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let record of records">
            <td>{{record.customer.fullName}}</td>
            <td>{{record.store?.name}}</td>
            <td>{{record.happenedDate}}</td>
          
            <td class="text-right">
                <button uiSref="shop.records.record" [uiParams]="{recordId: record.id}" class="btn btn-default btn-circle-micro" tooltip="查看" placement="bottom">
                    <i class="wj-icon wj-view"></i>
                </button>
            </td>
        </tr>
        
        <tr *ngIf="!records.length">
            <td colspan="4" class="text-center">
            <p>
                <i class="wj-icon wj-empty3 fa-4x"></i> 
            </p>
            <p>还没有一份灸历？</p>
            </td>
        </tr>
        </tbody>
    </table>
    `,
    styles: [],
    providers: []
})
export class RecordListComponent {
    constructor(private api:ApiService) {}

    @Input() records:any[];

}
