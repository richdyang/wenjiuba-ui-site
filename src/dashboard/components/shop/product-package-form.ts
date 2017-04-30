import {Component, ViewEncapsulation, Input} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {MenuItem} from "../../../widget/common/api";
import {DictService} from "../../../shared/services/dict";
import {Transition, UIRouter} from "@uirouter/angular";

@Component({
    selector: 'product-package-form',
    template: `
    <div class="page-header">
        <h4>产品包信息</h4>
    </div>
    
    <form #productForm="ngForm">
        <p-form-field label="名称 *">
          <input type="text" [(ngModel)]="productPackage.name" name="name" class="form-control" required minlength="2">
        </p-form-field>
        <p-form-field label="是否网上开放? *">
          <p-selectButton [options]="dict.options('yesno')" [(ngModel)]="productPackage.onlineInd" name="onlineInd" required></p-selectButton>
        </p-form-field>
        <p-form-field label="是否线下可用? *">
          <p-selectButton [options]="dict.options('yesno')" [(ngModel)]="productPackage.offlineInd" name="offlineInd" required></p-selectButton>
        </p-form-field>
        <p-form-field label="预约费用 *">
          <input type="number" [(ngModel)]="productPackage.depositFee" name="depositFee" class="form-control" required>
        </p-form-field>
        <p-form-field label="额外费用 *" help="除了其包含项目以外的收费">
          <input type="number" [(ngModel)]="productPackage.extraCost" name="extraCost" class="form-control" required>
        </p-form-field>
        <p-form-field label="是否自动计算价格? *" help="通过其包含的项目+额外费用自动计算此套餐总价格">
          <p-selectButton [options]="dict.options('yesno')" [(ngModel)]="productPackage.autoPriceInd" name="autoPriceInd" required></p-selectButton>
        </p-form-field>
        <p-form-field label="是否当前可用? *">
          <p-selectButton [options]="dict.options('yesno')" [(ngModel)]="productPackage.availableInd" name="availableInd" required></p-selectButton>
        </p-form-field>
        
        <div class="row">
        <p-pickList [source]="productsNotInPackage" sourceHeader="可选服务" [showSourceControls]="false" [target]="productPackage.products" targetHeader="已有服务" [responsive]="true">
            <template let-product>
                <div class="ui-helper-clearfix">
                    {{product.name}}
                </div>
            </template>
        </p-pickList>
        </div>
        
        
        <button class="btn btn-primary" [disabled]="!productForm.valid" (click)="onSubmit()">保存</button>
    </form>
    
    
    `,
    styles: [],
    providers: [],
    encapsulation: ViewEncapsulation.None
})
export class ProductPackageFormComponent {
    constructor(private api:ApiService, private dict:DictService, private router: UIRouter) {}

    // models
    @Input() products:any[]; // get from parent route
    @Input() productPackage:any= {products:[]};

    private productsNotInPackage:any[] = [];

    ngOnInit() {
        function diff(arr1:any[], arr2:any[]):any[] {
            let a2 = {}
            for(let el of arr2) {
                a2[el.id] = el;
            }
           return arr1.filter(function(el) {return !a2[el.id]});
        }
        this.productsNotInPackage = diff(this.products, this.productPackage.products);
    }

    private onSubmit() {
        this.api.save('/shop/products/packages', this.productPackage).then(_ => {
            this.router.stateService.go('shop.products', null, {reload: 'shop.products'})
        });
    }

}
