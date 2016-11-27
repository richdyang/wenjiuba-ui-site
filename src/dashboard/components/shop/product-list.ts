import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {DictService} from "../../../shared/services/dict";

@Component({
    selector: 'product-list',
    templateUrl: './product-list.html',
    styles: [],
    providers: [],
})
export class ProductListComponent {
    constructor(private api: ApiService, private dict: DictService) {}

    static resolve = [
        {
            token: 'products',
            deps: [ApiService],
            resolveFn: (api) => api.get('/shops/default/products')
        },
        {
            token: 'productPackages',
            deps: [ApiService],
            resolveFn: (api) => api.get('/shops/default/products/packages')
        },
    ]

    @Input() products;
    @Input() productPackages;
}
