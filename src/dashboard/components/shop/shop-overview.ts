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
      this.api.post('/shop/account/payment', {amount: amount}).then(alipayTrade => {
          this.router.stateService.go('shop.overview.payment', {alipayTrade: alipayTrade});
      })
  }

}
