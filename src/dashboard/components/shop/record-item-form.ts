import {Component, ViewEncapsulation, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {MenuItem} from "../../../widget/common/api";
import {DictService} from "../../../shared/services/dict";
import {Transition, UIRouter} from "ui-router-ng2/ng2";

@Component({
    selector: 'record-item-form',
    template:  `
    <div class="page-header">
        <h4>灸例单项信息</h4>
        <div class="pull-right" *ngIf="recordItem.id">
            <a href uiSref="shop-records.record.item" [uiParams]="{recordId: record.id, recordItemId: recordItem.id}" class="btn btn-primary btn-circle btn-circle-sm"><i class="fa fa-book"></i></a>
            <a href uiSref="shop-records.record.extra" [uiParams]="{recordId: record.id, recordItemId: recordItem.id}" class="btn btn-default btn-circle btn-circle-sm"><i class="fa fa-ellipsis-h"></i></a>
        </div>
    </div>
    <form #recordItemForm="ngForm">
        <fieldset>
            <p-form-field label="标题 *">
                <input type="text" [(ngModel)]="recordItem.title" name="title" class="form-control" required minlength="2">
            </p-form-field>
            <p-form-field label="产品 *">
                <select [(ngModel)]="recordItem.product.id" name="product" class="form-control">
                    <option *ngFor="let product of products" [ngValue]="product.id">{{product.name}}</option>
                </select>
            </p-form-field>
            <p-form-field label="技师 *">
                <select [(ngModel)]="recordItem.technician.id" name="technicianId" class="form-control">
                    <option *ngFor="let technician of technicians" [ngValue]="technician.id">{{technician.fullName}}</option>
                </select>
            </p-form-field>
            <p-form-field label="时间 *">
                <input type="text" [(ngModel)]="recordItem.happenedFrom" name="happenedFrom" class="form-control">
                <!--<p-calendar [(ngModel)]="recordItem.happenedFrom" name="happenedFrom" timeOnly="true" hourFormat="24"></p-calendar>-->
                ~
                <input type="text" [(ngModel)]="recordItem.happenedTo" name="happenedTo" class="form-control">
                <!--<p-calendar [(ngModel)]="recordItem.happenedTo" name="happenedTo" timeOnly="true" hourFormat="24"></p-calendar>-->
            </p-form-field>
            <p-form-field label="地点1 *">
                <input type="text" [(ngModel)]="recordItem.location1" name="location1" class="form-control" required minlength="2">
            </p-form-field>
            <p-form-field label="地点2">
                <input type="text" [(ngModel)]="recordItem.location2" name="location2" class="form-control">
            </p-form-field>
            <p-form-field label="消费金额 *">
                <input type="number" [(ngModel)]="recordItem.price" name="price" class="form-control">
            </p-form-field>
        </fieldset>
        
        <button class="btn btn-primary" [disabled]="!recordItemForm.valid" (click)="onSubmit()">保存</button>
    </form>
    `,
    styles: [`
    `],
    providers: [],
    encapsulation: ViewEncapsulation.None
})
export class RecordItemFormComponent implements OnInit {
    constructor(private api:ApiService, private dict:DictService, private router:UIRouter) {}

    private static resolve_shared = [
        {
            token: 'products',
            deps: [ApiService,Transition],
            resolveFn: (api, transition) => api.get(`/shops/default/products`)
        },
        {
            token: 'technicians',
            deps: [ApiService,Transition],
            resolveFn: (api, transition) => api.get(`/shops/default/employees`)
        },
    ]

    static resolve_new = [
        ...RecordItemFormComponent.resolve_shared
    ]

    static resolve_edit = [
        ...RecordItemFormComponent.resolve_shared,
        {
            token: 'recordItem',
            deps: [ApiService,Transition],
            resolveFn: (api, transition) => api.get(`/shops/default/records/${transition.params().recordId}/items/${transition.params().recordItemId}`)
        },
    ]

    // models
    @Input() products:any[] = [];
    @Input() technicians:any[] = [];
    @Input() record:any= {}; // from parent route
    @Input() recordItem:any = {product:{},technician:{}};

    ngOnInit() {

    }

    private onSubmit() {
        this.api.save(`/shops/default/records/${this.record.id}/items`, this.recordItem).then(recordItem => {
            this.router.stateService.go('shop-records.record.extra', {recordId: this.record.id, recordItemId: this.recordItem.id})
        });
    }

}
