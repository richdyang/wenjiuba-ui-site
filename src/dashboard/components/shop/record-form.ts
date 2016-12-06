import {Component, ViewEncapsulation, Input} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {MenuItem} from "../../../widget/common/api";
import {DictService} from "../../../shared/services/dict";
import {Transition, UIRouter} from "ui-router-ng2/ng2";

@Component({
    selector: 'record-form',
    template: `
    <div class="page-header">
        <h4>病例基本信息</h4>
    </div>
    
    <form #recordForm="ngForm">
        <p-form-field label="客户 *">
          <select [(ngModel)]="record.customer.id" name="cutomerId" class="form-control">
            <option *ngFor="let customer of customers" value="{{customer.id}}">{{customer.fullName}}</option>
          </select>
        </p-form-field>
        <p-form-field label="门店 *">
          <select [(ngModel)]="record.store.id" name="storeId" class="form-control">
            <option *ngFor="let store of stores" value="{{store.id}}">{{store.name}}</option>
          </select>
        </p-form-field>
        <p-form-field label="日期 *">
          <p-calendar [(ngModel)]="record.happenedDate" name="happenedDate"></p-calendar>
        </p-form-field>
        
        <button class="btn btn-primary" [disabled]="!recordForm.valid" (click)="onSubmit()">保存</button>
    </form>
        
    <table class="table table-striped table-hover">
        <caption class="text-right">
            <a href uiSref="shop-records.record.new-item" class="btn btn-primary btn-circle-sm"><i class="fa fa-plus"></i></a>
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
            <td>{{recordItem.technicianId}}</td>
            <td>{{recordItem.productType}}</td>
            <td>{{recordItem.happenedFrom}} ~ {{recordItem.happenedTo}}</td>
           
            <td class="text-right">
                <button uiSref="shop-records.record.item" [uiParams]="{recordItemId: recordItem.id}" class="btn btn-default btn-circle-sm" title="修改">
                    <i class="fa fa-pencil"></i>
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
export class RecordFormComponent {
    constructor(private api:ApiService, private dict:DictService, private router:UIRouter) {}

    private static resolve_shared = [
        {
            token: 'customers',
            deps: [ApiService, Transition],
            resolveFn: (api, transition) => api.get(`/shops/default/customers`)
        },
        {
            token: 'stores',
            deps: [ApiService, Transition],
            resolveFn: (api, transition) => api.get(`/shops/default/stores`)
        }
    ]

    static resolve_new = [
        ...RecordFormComponent.resolve_shared,
    ]

    static resolve_edit = [
        ...RecordFormComponent.resolve_shared,
        {
            token: 'record',
            deps: [ApiService, Transition],
            resolveFn: (api, transition) => api.get(`/shops/default/records/${transition.params().recordId}`)
        },
    ]
    // models
    @Input() record:any = {customer:{},store:{}};
    @Input() customers:any[] = [];
    @Input() stores:any[] = [];

    ngOnInit() {
    }

    private onSubmit() {
        this.api.save('/shops/default/records', this.record).then(record => {
            this.router.stateService.go('shop-records.record', {recordId: record.id});
        });
    }

}


