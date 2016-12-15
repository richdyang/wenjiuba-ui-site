import {Component, ViewEncapsulation, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {Transition} from "ui-router-ng2/ng2";
import {DictService} from "../../../shared/services/dict";

@Component({
  selector: 'customer-account',
  template: `
  $: {{account.balance}}
  `,
  styles: [],
  providers: []
})
export class CustomerAccountComponent {

  constructor(private api:ApiService, private dict: DictService) {}

  private today:Date = new Date();

  // models
  @Input() account:any = {}



}
