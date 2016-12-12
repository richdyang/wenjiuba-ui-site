import {Component, ViewEncapsulation, Input} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {MenuItem} from "../../../widget/common/api";
import {DictService} from "../../../shared/services/dict";
import {Transition, UIRouter} from "ui-router-ng2/ng2";

@Component({
    selector: 'record-detail',
    template: `
    <div class="page-header">
        <h4>灸例信息</h4>
    </div>
    
    <table class="table">
        <caption class="text-center">{{record.customer.fullName}}</caption>
        <tr>
            <td class="text-right">门店：{{record.store.name}}</td>
        </tr>
        <tr>
            <td class="text-right">日期：{{record.happenedDate}}</td>
        </tr>
        
    </table>

        
    <table class="table table-striped table-hover">
        <caption class="text-right">
            <button uiSref="shop-records.record.new-item" class="btn btn-primary btn-circle-sm"><i class="wj-icon wj-add"></i></button>
        </caption>
        <thead>
        <tr>
            <th>名称</th>
            <th>技师</th>
            <th>类型</th>
            <th>时间段</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <p *ngIf="!record.items || record.items.length==0">您还没有记录服务项呢，现在录入一项吧？</p>
        <tr *ngFor="let recordItem of record.items">
            <td>{{recordItem.title}}</td>
            <td>{{recordItem.technician.fullName}}</td>
            <td>{{recordItem.productType}}</td>
            <td>{{recordItem.happenedFrom}} ~ {{recordItem.happenedTo}}</td>
           
            <td class="text-right">
                <button uiSref="shop-records.record.item" [uiParams]="{recordItemId: recordItem.id}" class="btn btn-default btn-circle-sm" title="修改">
                    <i class="wj-icon wj-edit"></i>
                </button>
            </td>
        </tr>
        </tbody>
    </table>
    `,
    styles: [],
    providers: [],
    encapsulation: ViewEncapsulation.None
})
export class RecordDetailComponent {
    constructor(private api:ApiService, private dict:DictService, private router:UIRouter) {}

    static resolve = [
        {
            token: 'record',
            deps: [ApiService, Transition],
            resolveFn: (api, transition) => api.get(`/shop/records/${transition.params().recordId}`)
        }
    ]
    @Input() record:any = {customer:{},store:{}};

    ngOnInit() {
    }
}


