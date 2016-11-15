import {Component, Input} from '@angular/core';
import {ApiService} from "../../../shared/services/api";

@Component({
    selector: 'store-list',
    template: `
    <div class="page-header">
      <h4>门店管理</h4>
      <div class="pull-right">
        <a href uiSref="shop-outline" class="btn btn-default btn-circle"><i class="fa fa-home"></i></a>
        <a href uiSref="shop-stores" class="btn btn-info btn-circle"><i class="fa fa-building"></i></a>
        <a href uiSref="shop-employees" class="btn btn-default btn-circle"><i class="fa fa-user"></i></a>
        <a href uiSref="shop-services" class="btn btn-default btn-circle"><i class="fa fa-bed"></i></a>
        <a href uiSref="shop-customer" class="btn btn-default btn-circle"><i class="fa fa-female"></i></a>
        <a href uiSref="shop-records" class="btn btn-default btn-circle"><i class="fa fa-archive"></i></a>
        <a href uiSref="shop-records" class="btn btn-default btn-circle"><i class="fa fa-id-card"></i></a>
      </div>
    </div>

    <div class="pull-right">
      <a href uiSref="shop-stores.new" class="btn btn-primary btn-circle-sm"><i class="fa fa-plus"></i></a>
    </div>
  
    <div class="row">
        <div class="col-xs-12 col-md-12">
          <p *ngIf="!stores || stores.length==0">您还没有任何一家门店呢，现在开办一家吧？</p>
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
                <button class="btn btn-default" uiSref="shop-stores.edit" [uiParams]="{id: store.id}" role="button">
                  修改门店信息
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
    constructor(private api:ApiService) {
    }

    static resolve = [
        {
            token: 'stores',
            deps: [ApiService],
            resolveFn: (api) => api.get('/shops/default/stores')
        }
    ]

    @Input() stores:any[];

}
