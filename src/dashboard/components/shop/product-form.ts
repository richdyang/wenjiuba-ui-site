import {Component, ViewEncapsulation, Input} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {MenuItem} from "../../../widget/common/api";
import {DictService} from "../../../shared/services/dict";
import {Transition, UIRouter} from "ui-router-ng2/ng2";

@Component({
    selector: 'product-form',
    template: `
    <div class="page-header">
        <h4>产品信息</h4>
    </div>
    
    <form #productForm="ngForm">
        <p-form-field label="名称 *">
          <input type="text" [(ngModel)]="product.name" name="name" class="form-control" required minlength="2" maxlength="50">
        </p-form-field>
        <p-form-field label="描述 *">
          <p-editor [(ngModel)]="product.introduction" name="introduction" [uploadHandler]="api.uploadHandler" required mintextlength="20"></p-editor>
        </p-form-field>
        <p-form-field label="价格 *">
          <input type="number" [(ngModel)]="product.price" name="mobile" class="form-control" required>
        </p-form-field>
        <p-form-field label="项目类型? *">
          <p-selectButton [options]="dict.options('product.productType')" [(ngModel)]="product.productType" name="productType" required></p-selectButton>
        </p-form-field>
        
        <button class="btn btn-primary" [disabled]="!productForm.valid" (click)="onSubmit()">保存</button>
    </form>
    `,
    styles: [],
    providers: [],
    encapsulation: ViewEncapsulation.None
})
export class ProductFormComponent {
    constructor(private api:ApiService, private dict:DictService, private router: UIRouter) {}

    // models
    @Input() product:any= {};

    ngOnInit() {
    }

    private onSubmit() {
        this.api.save('/shop/products', this.product).then(_ => {
            this.router.stateService.go('shop.products', null, {reload: 'shop.products'})
        });
    }

}
