import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api";

@Component({
  selector: 'shop-outline',
  templateUrl: './shop-outline.html',
  styles: [],
  providers: [],
})
export class ShopOutlineComponent {

  constructor(private api:ApiService) {}

  static resolve = [
    {
      token: 'shop',
      deps: [ApiService],
      resolveFn: (api) => api.get('/shops/default')
    }
  ]

  @Input() shop;

}
