import {Component, ViewEncapsulation, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {Transition} from "ui-router-ng2/ng2";

@Component({
  selector: 'store-form',
  template: `
  <div class="page-header">
    <h4>门店信息</h4>
  </div>
  
  <form #storeForm="ngForm">
    <p-form-field label="分店名称 *">
      <input type="text" [(ngModel)]="store.name" name="name" class="form-control" required>
    </p-form-field>
    <p-form-field label="分店介绍 *">
      <p-editor [(ngModel)]="store.introduction" name="introduction" [uploadHandler]="api.uploadHandler" required mintextlength="20"></p-editor>
    </p-form-field>
    <p-form-field label="分店地址 *">
      <input type="text" [(ngModel)]="store.address" name="address" class="form-control" required>
    </p-form-field>
    <p-form-field label="联系电话 *">
      <input type="text" [(ngModel)]="store.telephone" name="telephone" class="form-control" required>
    </p-form-field>
    <p-form-field label="联系人 *">
      <input type="text" [(ngModel)]="store.contact" name="contact" class="form-control" required>
    </p-form-field>
    
    <button class="btn btn-primary" [disabled]="!storeForm.valid" (click)="onSubmit()">保存</button>
  </form>
  `,
  styles: [],
  providers: []
})
export class StoreFormComponent {

  constructor(private api:ApiService) {}

  static resolve = [
    {
      token: 'store',
      deps: [ApiService,Transition],
      resolveFn: (api, transition) => api.get(`/shops/default/stores/${transition.params().id}`)
    }
  ]

  // models
  @Input() store:any= {};


  private onSubmit() {
    this.api.save('/shops/default/stores', this.store);
  }

}
