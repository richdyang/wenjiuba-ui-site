import {Component, ViewEncapsulation, Input} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {MenuItem} from "../../../widget/common/api";
import {DictService} from "../../../shared/services/dict";
import {Transition, UIRouter} from "ui-router-ng2/ng2";

@Component({
    selector: 'record-item-extra-form',
    templateUrl: './record-item-extra-form.html',
    styles: [],
    providers: [],
    encapsulation: ViewEncapsulation.None
})
export class RecordItemExtraFormComponent {
    constructor(private api:ApiService, private dict:DictService, private router: UIRouter) {}

    // models
    @Input() package:any = {}
    @Input() record:any = {} // from parent route
    @Input() recordItem:any = {};
    @Input() extra:any= {};

    private meridians= [
        {name: '肺', code: 'lu'},
        {name: '心包', code: 'pc'},
        {name: '心', code: 'ht'},
        {name: '小肠', code: 'si'},
        {name: '三焦', code: 'te'},
        {name: '大肠', code: 'li'},
        {name: '脾', code: 'sp'},
        {name: '肝', code: 'lr'},
        {name: '肾', code: 'ki'},
        {name: '膀胱', code: 'bl'},
        {name: '胆', code: 'gb'},
        {name: '胃', code: 'st'},
    ]

    private acupoints = [1];
    private addAcupoint() {
        let next = this.acupoints.length+1;
        this.acupoints.push(next)
    }

    ngOnInit() {
        function toAge(birthday:string) {
            let birth = new Date(birthday);
            let thisyear = new Date();
            return thisyear.getFullYear() - birth.getFullYear();
        }
        if(!this.extra.id && this.recordItem.product.productType === 'ENOTER') { // new mode
            let properties = ['fullName', 'gender', 'menses', 'height', 'weight', 'bpHigh', 'bpLow'];
            // populate properties
            for(let property of properties) {
                this.extra[property] = this.record.customer[property];
            }
            this.extra.age = toAge(this.record.customer.birthday);
        }
    }

    private onSubmit() {
        let params:any = this.router.stateService.params
        this.api.post(`/shop/records/${params.recordId}/items/${params.recordItemId}/extra`, this.extra)
            .then(_ => {
                this.router.stateService.go('shop.records.record', {recordId: this.record.id}, {reload: 'shop.records.record'});
            });
    }

}
