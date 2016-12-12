import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api";

@Component({
  selector: 'shop-overview',
  templateUrl: './shop-overview.html',
  styles: [],
  providers: [],
})
export class ShopOverviewComponent {

  constructor(private api:ApiService) {}

  static resolve = [
    {
      token: 'shop',
      deps: [ApiService],
      resolveFn: (api) => api.get('/shop')
    },
      {
          token: 'shopAccount',
          deps: [ApiService],
          resolveFn: (api) => api.get('/shop/account')
      }
  ]

  @Input() shop;
    @Input() shopAccount;

}
