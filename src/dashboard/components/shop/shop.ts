import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api";

@Component({
  selector: 'shop',
  templateUrl: `
  `,
  styles: [],
  providers: [],
})
export class ShopComponent {

  constructor(private api:ApiService) {}

  @Input() shop;

}
