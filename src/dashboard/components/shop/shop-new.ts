import {Component, ViewEncapsulation} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {MenuItem} from "../../../widget/common/api";
import {DictService} from "../../../shared/services/dict";

@Component({
    selector: 'shop-new',
    templateUrl: './shop-new.html',
    styles: [`
    main {
    border-right: solid 1px #eeeeee;
    }
    `],
    providers: [],
})
export class ShopNewComponent {
    constructor(private api:ApiService, private dict:DictService) {}

    // ui control
    private steps:MenuItem[];
    private activeIndex:number = 0;

    // models
    private employee:any = {};
    private shop:any = {};
    private shopVerification:any = {};

    ngOnInit() {
        this.steps = [
            {label: '完善个人资料'},
            {label: '填写网店信息'},
            {label: '上传扫描材料'}
        ];
    }

    private onSubmit() {
        this.api.post('/shop', {employee: this.employee, shop: this.shop, shopVerification: this.shopVerification})
    }

}
