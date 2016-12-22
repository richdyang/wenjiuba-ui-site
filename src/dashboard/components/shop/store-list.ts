import {Component, Input} from '@angular/core';
import {ApiService} from "../../../shared/services/api";

@Component({
    selector: 'store-list',
    template: `
    <div class="page-header">
      <h4>门店管理</h4>
      <div class="pull-right">
          <button uiSref="shop.overview" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="店务管理" tooltipPlacement="bottom"><i class="wj-icon wj-shop"></i></button>
          <button uiSref="shop.stores" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="门店管理" tooltipPlacement="bottom"><i class="wj-icon wj-store"></i></button>
          <button uiSref="shop.employees" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="员工管理" tooltipPlacement="bottom"><i class="wj-icon wj-employee"></i></button>
          <button uiSref="shop.products" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="产品管理" tooltipPlacement="bottom"><i class="wj-icon wj-product"></i></button>
          <button uiSref="shop.customers" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="客户管理" tooltipPlacement="bottom"><i class="wj-icon wj-customer"></i></button>
          <button uiSref="shop.records" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="灸例管理" tooltipPlacement="bottom"><i class="wj-icon wj-record"></i></button>
          <button uiSref="shop.records" class="btn btn-default btn-circle" uiSrefActive="btn-primary" tooltip="健康档案" tooltipPlacement="bottom"><i class="wj-icon wj-health-record"></i></button>
      </div>
    </div>
  
    <div class="row">
        <div class="col-xs-12 col-md-12 text-right" style="padding: 8px 23px">
            <button uiSref="shop.stores.new" class="btn btn-primary btn-circle-micro" tooltip="添加" tooltipPlacement="bottom"><i class="wj-icon wj-add"></i></button>
        </div>
    
        <div class="col-xs-12 col-md-12" *ngIf="!stores.length">
          <p>
             <i class="wj-icon wj-empty3 fa-4x"></i> 
          </p>
          <p>还没有一家门店？</p>
        </div>
        
        <div class="col-xs-12 col-md-12" *ngFor="let store of stores">
          <div class="thumbnail">
            <img src="{{store.brand}}" alt="">
            <div class="caption">
              <h3>{{store.name}}</h3>
              <p>{{store.introduction | excerpt:100}}</p>
              <p>
                <i class="fa fa-building-o"></i> 门店地址：{{store.address}}
              </p>
              <p>
                <i class="fa fa-phone-square"></i> 联系电话：{{store.telephone}}
              </p>
              <p>
                <i class="fa fa-user"></i> 联系人：{{store.contact}}
              </p>
              <p class="text-right">
                <button class="btn btn-default btn-circle-micro" uiSref="shop.stores.store.edit" [uiParams]="{storeId: store.id}" tooltip="修改" tooltipPlacement="bottom">
                  <i class="wj-icon wj-edit"></i>
                </button>
              </p>
            </div>
          </div>
        </div>
   
    </div>
    `,
    styles: [],
    providers: []
})
export class StoreListComponent {
    constructor(private api:ApiService) {}

    @Input() stores:any[];

}
