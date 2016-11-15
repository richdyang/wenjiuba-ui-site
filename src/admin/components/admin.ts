import {Component, Input} from '@angular/core';
import {ApiService} from "../../shared/services/api";

@Component({
    selector: 'admin',
    template: `
    <div class="row" *ngIf="shop">
      <div class="col-xs-6 col-md-3">
        <a  uiSref="shop-outline" class="thumbnail">
          <img src="{{shop.brand}}" alt="店务管理">
        </a>
      </div>
    </div>
        
        <div class="row" *ngIf="!shop">
          <div class="col-xs-12 col-md-12">
            <div class="thumbnail">
              <!--<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU4NTY1YzM5ZjcgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTg1NjVjMzlmNyI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTkzNzUiIHk9IjEwNS40Ij4yNDJ4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+" alt="">-->
              <div class="caption">
                <h4>您还没有开店</h4>
                <p>开店需要提供真实营业执照、个人身份等扫描件</p>
                <p class="text-right">
                  <a uiSref="shop-new" class="btn btn-primary" role="button">进入开店</a>
                </p>
              </div>
            </div>
          </div>
        </div>
    `,
    styles: [],
    providers: [],
})
export class AdminComponent {
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
