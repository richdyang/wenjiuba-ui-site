import {Component, ViewEncapsulation, Input} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {MenuItem} from "../../../widget/common/api";
import {DictService} from "../../../shared/services/dict";
import {Transition, UIRouter} from "ui-router-ng2/ng2";

const template = `
<div class="page-header">
    <h4>灸例信息</h4>
</div>

<table class="table">
    <caption class="text-center">
        <span style="font-size: 2em; vertical-align: middle">{{record.customer.fullName}}</span>
        <span class="pull-right">
            <button uiSref="shop.records.record.items.new" class="btn btn-default btn-circle-micro" tooltip="添加" tooltipPlacement="bottom"><i class="wj-icon wj-add"></i></button>
            <button uiSref="shop.records.record.edit" [uiParams]="{recordId: record.id}" class="btn btn-default btn-circle-micro" tooltip="修改" tooltipPlacement="bottom">
                <i class="wj-icon wj-edit"></i>
            </button>
        </span>
    </caption>
    <tr>
        <td class="text-right">
        <span>{{record.store.name}}</span> 
        <span class="text-muted"><i class="fa fa-clock-o"></i> {{record.happenedDate}}</span>
        </td>
    </tr>
    
</table>

<div class="panel panel-default" *ngFor="let recordItem of record.items">
    <div class="panel-heading">
        <span class="label label-danger">{{dict.display('product.productType', recordItem.productType)}}</span>
        <span>{{recordItem.title}} </span>
        <button uiSref="shop.records.record.items.item.edit" [uiParams]="{recordItemId: recordItem.id}" class="btn btn-default btn-circle-micro pull-right" tooltip="修改" tooltipPlacement="bottom">
            <i class="wj-icon wj-edit"></i>
        </button>
    </div>
    <div class="panel-body">
        <p>{{recordItem.technician.fullName}} <span>{{recordItem.happenedFrom}} ~ {{recordItem.happenedTo}}</span></p>
        <p>{{recordItem.location1}} / {{recordItem.location2}}</p>
    </div>
</div>
`

@Component({
    selector: 'record-detail',
    template: template,
    styles: [],
    providers: [],
    encapsulation: ViewEncapsulation.None
})
export class RecordDetailComponent {
    constructor(private api:ApiService, private dict:DictService, private router:UIRouter) {}

    @Input() record:any = {customer:{},store:{}};

    ngOnInit() {
    }
}





