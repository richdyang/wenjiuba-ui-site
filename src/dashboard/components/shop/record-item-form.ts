import {Component, ViewEncapsulation, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {DictService} from "../../../shared/services/dict";
import {Transition, UIRouter} from "ui-router-ng2/ng2";

@Component({
    selector: 'record-item-form',
    template:  `
    <div class="page-header">
        <h4>灸历单项信息</h4>
        <div class="pull-right" *ngIf="recordItem.id">
            <a href uiSref="shop.records.record.items.item.edit" [uiParams]="{recordId: record.id, recordItemId: recordItem.id}" class="btn btn-primary btn-circle btn-circle-sm"><i class="fa fa-book"></i></a>
            <a href uiSref="shop.records.record.items.item.extra" [uiParams]="{recordId: record.id, recordItemId: recordItem.id}" class="btn btn-default btn-circle btn-circle-sm"><i class="fa fa-ellipsis-h"></i></a>
        </div>
    </div>
    <form #recordItemForm="ngForm">
        <fieldset>
            <p-form-field label="标题 *">
                <input type="text" [(ngModel)]="recordItem.title" name="title" class="form-control" required minlength="2" maxlength="100">
            </p-form-field>
            <p-form-field label="产品 *">
                <p-select [(ngModel)]="recordItem.product.id" name="productId" [items]="products" textField="name" placeholder="请选择产品.." [allowClear]="true" [disabled]="recordItem.id"></p-select>
                <!--<select  class="form-control">-->
                    <!--<option *ngFor="let product of products" [ngValue]="product.id">{{product.name}}</option>-->
                <!--</select>-->
            </p-form-field>
            <p-form-field label="技师 *">
                <p-select [(ngModel)]="recordItem.technician.id" name="technicianId" [items]="technicians" placeholder="请选择技师.." [allowClear]="true"></p-select>
                <!--<select [(ngModel)]="recordItem.technician.id" name="technicianId" class="form-control">-->
                    <!--<option *ngFor="let technician of technicians" [ngValue]="technician.id">{{technician.fullName}}</option>-->
                <!--</select>-->
            </p-form-field>
            <p-form-field label="时间 *">
                <input type="text" [(ngModel)]="recordItem.happenedFrom" name="happenedFrom" class="form-control" required placeholder="14:00:00">
                <!--<p-calendar [(ngModel)]="recordItem.happenedFrom" name="happenedFrom" timeOnly="true" hourFormat="24"></p-calendar>-->
                ~
                <input type="text" [(ngModel)]="recordItem.happenedTo" name="happenedTo" class="form-control" required placeholder="15:00:00">
                <!--<p-calendar [(ngModel)]="recordItem.happenedTo" name="happenedTo" timeOnly="true" hourFormat="24"></p-calendar>-->
            </p-form-field>
            <p-form-field label="地点1 *" help="例如：房间名、房间号">
                <input type="text" [(ngModel)]="recordItem.location1" name="location1" class="form-control" required minlength="2" maxlength="50">
            </p-form-field>
            <p-form-field label="地点2" help="例如：房间名、房间号">
                <input type="text" [(ngModel)]="recordItem.location2" name="location2" class="form-control" maxlength="50">
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

    static resolve_select = [
        {
            token: 'products',
            deps: [ApiService,Transition],
            resolveFn: (api, transition) => api.get(`/shop/products`)
        },
        {
            token: 'technicians',
            deps: [ApiService,Transition],
            resolveFn: (api, transition) => api.get(`/shop/employees`)
        },
    ]

    // models
    @Input() products:any[] = [];
    @Input() technicians:any[] = [];
    @Input() record:any= {}; // from parent route
    @Input() recordItem:any = {product:{},technician:{}};

    ngOnInit() {
        this.products = this.products.map(product => ({id: product.id, 'text': product.name}));
        this.technicians = this.technicians.map(technician => ({id: technician.id, 'text': technician.fullName}))
    }

    private onSubmit() {
        this.api.save(`/shop/records/${this.record.id}/items`, this.recordItem)
            .then(_ => {
                this.router.stateService.go('shop.records.record', {recordId: this.record.id}, {reload: 'shop.records.record'});
            });
        // .then(recordItem => {
        //     this.router.stateService.go('shop.records.record.items.item.extra', {recordId: this.record.id, recordItemId: this.recordItem.id}, {reload: 'shop.records.record.items.item.extra'})
        // });
    }

}
