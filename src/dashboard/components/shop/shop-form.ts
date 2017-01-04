import {Component, ViewEncapsulation, Input} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {MenuItem} from "../../../widget/common/api";
import {DictService} from "../../../shared/services/dict";
import {UIRouter} from "ui-router-ng2";

@Component({
    selector: 'shop-form',
    template: `
    <div class="page-header">
      <h4>灸馆信息</h4>
    </div>
    
    
    <form #shopForm="ngForm">
        <p-form-field label="店名 *">
          <input type="text" [(ngModel)]="shop.name" name="name" class="form-control" required minlength="2" maxlength="50" disabled>
        </p-form-field>
        <p-form-field label="介绍 *">
          <p-editor [(ngModel)]="shop.description" name="description" [uploadHandler]="api.uploadHander" required mintextlength="20"></p-editor>
        </p-form-field>
        <p-form-field label="品牌图片 *">
          <p-file-input [(ngModel)]="shop.brand" name="brand" [uploadOptions]="api.uploadOptions" required></p-file-input>
        </p-form-field>
        
        <a class="btn btn-primary" [class.disabled]="!shopForm.valid" (click)="submit()">保存</a>
    </form>
    `,
    providers: [],
})
export class ShopFormComponent {
    constructor(private api:ApiService, private dict:DictService, private router: UIRouter) {}

    // models
    @Input() shop:any = {};

    private submit() {
        this.api.put('/shop', this.shop).then(_ => {
            this.router.stateService.go('shop.overview', null, {reload: 'shop.overview'})
        })
    }

}
