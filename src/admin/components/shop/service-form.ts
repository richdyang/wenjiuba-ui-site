import {Component, ViewEncapsulation, Input} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {MenuItem} from "../../../widget/common/api";
import {DictService} from "../../../shared/services/dict";
import {Transition} from "ui-router-ng2/ng2";

@Component({
    selector: 'service-form',
    template: `
    <div class="page-header">
        <h4>服务信息</h4>
    </div>
    
    <form #serviceForm="ngForm">
        <p-form-field label="名称 *">
          <input type="text" [(ngModel)]="service.name" name="name" class="form-control" required minlength="2">
        </p-form-field>
        <p-form-field label="描述 *">
          <p-editor [(ngModel)]="service.introduction" name="introduction" [uploadHandler]="api.uploadHandler" required mintextlength="20"></p-editor>
        </p-form-field>
        <p-form-field label="价格 *">
          <input type="number" [(ngModel)]="service.price" name="mobile" class="form-control" required>
        </p-form-field>
        <p-form-field label="是否为e络通项目? *">
          <p-selectButton [options]="dict.options('yesno')" [(ngModel)]="service.enoterInd" name="enoterInd" required></p-selectButton>
        </p-form-field>
        
        <button class="btn btn-primary" [disabled]="!serviceForm.valid" (click)="onSubmit()">保存</button>
    </form>
    `,
    styles: [],
    providers: [],
    encapsulation: ViewEncapsulation.None
})
export class ServiceFormComponent {
    constructor(private api:ApiService, private dict:DictService) {}

    static resolve = [
        {
            token: 'service',
            deps: [ApiService,Transition],
            resolveFn: (api, transition) => api.get(`/shops/default/services/${transition.params().id}`)
        },
        // for new only
    ]

    // models
    @Input() service:any= {};

    ngOnInit() {
    }

    private onSubmit() {
        this.api.save('/shops/default/services', this.service);
    }

}
