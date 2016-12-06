import {Component, Input} from '@angular/core';
import {ApiService} from "../../../shared/services/api";

@Component({
    selector: 'record-list',
    template: `
    <div class="page-header">
      <h4>灸例管理</h4>
      <div class="pull-right">
        <a href uiSref="shop-outline" class="btn btn-default btn-circle"><i class="fa fa-home"></i></a>
        <a href uiSref="shop-stores" class="btn btn-default btn-circle"><i class="fa fa-building"></i></a>
        <a href uiSref="shop-employees" class="btn btn-default btn-circle"><i class="fa fa-user"></i></a>
        <a href uiSref="shop-products" class="btn btn-default btn-circle"><i class="fa fa-bed"></i></a>
        <a href uiSref="shop-customers" class="btn btn-default btn-circle"><i class="fa fa-female"></i></a>
        <a href uiSref="shop-records" class="btn btn-info btn-circle"><i class="fa fa-archive"></i></a>
        <a href uiSref="shop-records" class="btn btn-default btn-circle"><i class="fa fa-id-card"></i></a>
      </div>
    </div>
  
    
    
    <table class="table table-striped table-hover">
        <caption class="text-right">
            <a href uiSref="shop-records.new" class="btn btn-primary btn-circle-sm"><i class="fa fa-plus"></i></a>
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
                    <i class="fa fa-pencil"></i>
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
            resolveFn: (api) => api.get('/shops/default/records')
        }
    ]

    @Input() records:any[];

}
