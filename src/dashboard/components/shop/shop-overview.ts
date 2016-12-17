import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {UIRouter} from "ui-router-ng2";

@Component({
  selector: 'shop-overview',
  templateUrl: './shop-overview.html',
  styles: [],
  providers: [],
})
export class ShopOverviewComponent {

  constructor(private api:ApiService, private router:UIRouter) {}

  @Input() shop;
  @Input() shopAccount;

  private pay(amount:number) {
      this.api.get(`/alipay/presubmit?businessType=SHOP_ACCOUNT&totalFee=${amount}`).then(alipayTrade => {
          this.router.stateService.go('shop.overview.payment', {alipayTrade: alipayTrade});
      })
  }

}
