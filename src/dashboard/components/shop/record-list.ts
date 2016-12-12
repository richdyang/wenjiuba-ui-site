import {Component, Input} from '@angular/core';
import {ApiService} from "../../../shared/services/api";

@Component({
    selector: 'record-list',
    template: `
    <div class="page-header">
      <h4>灸例管理</h4>
      <div class="pull-right">
          <button uiSref="shop-outline" class="btn btn-default btn-circle" uiSrefActive="btn-primary"><i class="wj-icon wj-shop"></i></button>
          <button uiSref="shop-stores" class="btn btn-default btn-circle" uiSrefActive="btn-primary"><i class="wj-icon wj-store"></i></button>
          <button uiSref="shop-employees" class="btn btn-default btn-circle" uiSrefActive="btn-primary"><i class="wj-icon wj-employee"></i></button>
          <button uiSref="shop-products" class="btn btn-default btn-circle" uiSrefActive="btn-primary"><i class="wj-icon wj-product"></i></button>
          <button uiSref="shop-customers" class="btn btn-default btn-circle" uiSrefActive="btn-primary"><i class="wj-icon wj-customer"></i></button>
          <button uiSref="shop-records" class="btn btn-default btn-circle" uiSrefActive="btn-primary"><i class="wj-icon wj-record"></i></button>
          <button uiSref="shop-records" class="btn btn-default btn-circle" uiSrefActive="btn-primary"><i class="wj-icon wj-health-record"></i></button>
      </div>
    </div>
  
    
    
    <table class="table table-striped table-hover">
        <caption class="text-right">
            <button uiSref="shop-records.new" class="btn btn-primary btn-circle-sm"><i class="wj-icon wj-add"></i></button>
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
        <p *ngIf="!records || records.length==0">您还没有任何一份灸例呢，现在录入一份吧？</p>
        <tr *ngFor="let record of records">
            <td>{{record.customer.fullName}}</td>
            <td>{{record.store?.name}}</td>
            <td>{{record.happenedDate}}</td>
          
            <td class="text-right">
                <button uiSref="shop-records.record" [uiParams]="{recordId: record.id}" class="btn btn-default btn-circle-sm" title="修改">
                    <i class="wj-icon wj-edit"></i>
                </button>
            </td>
        </tr>
        </tbody>
    </table>
    `,
    styles: [],
    providers: []
})
export class RecordListComponent {
    constructor(private api:ApiService) {
    }

    static resolve = [
        {
            token: 'records',
            deps: [ApiService],
            resolveFn: (api) => api.get('/shop/records')
        }
    ]

    @Input() records:any[];

}
