import {Component, ViewEncapsulation, Input} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {MenuItem} from "../../../widget/common/api";
import {DictService} from "../../../shared/services/dict";
import {Transition, UIRouter} from "@uirouter/angular";

@Component({
    selector: 'record-form',
    template: `
    <div class="page-header">
        <h4>灸历基本信息</h4>
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

    `,
    styles: [],
    providers: [],
    encapsulation: ViewEncapsulation.None
})
export class RecordFormComponent {
    constructor(private api:ApiService, private dict:DictService, private router:UIRouter) {}

    public static resolve_select = [
        {
            token: 'customers',
            deps: [ApiService, Transition],
            resolveFn: (api, transition) => api.get(`/shop/customers`)
        },
        {
            token: 'stores',
            deps: [ApiService, Transition],
            resolveFn: (api, transition) => api.get(`/shop/stores`)
        }
    ]

    // models
    @Input() records:any[];
    @Input() record:any = {customer:{},store:{}};
    @Input() customers:any[] = [];
    @Input() stores:any[] = [];

    ngOnInit() {
    }

    private onSubmit() {
        this.api.save('/shop/records', this.record).then(record => {
            this.router.stateService.go('shop.records.record', {recordId: record.id}, {reload: 'shop.records.record'});
        });
    }

}


