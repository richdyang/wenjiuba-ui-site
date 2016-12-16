import {Component, ViewEncapsulation, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {Transition} from "ui-router-ng2/ng2";
import {DictService} from "../../../shared/services/dict";

@Component({
    selector: 'customer-account',
    template: `
    <div class="page-header">
    <h4>客户账户</h4>
    </div>
    
    <div class="well well-sm">
        <i class="wj-icon wj-wallet fa-3x"> {{account.balance}}</i>
    </div>
    `,
    styles: [],
    providers: []
})
export class CustomerAccountComponent {

    constructor(private api: ApiService, private dict: DictService) {
    }

    private today: Date = new Date();

    // models
    @Input() account: any = {}


}
