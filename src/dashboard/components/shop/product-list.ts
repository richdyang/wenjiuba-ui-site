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

    @Input() products;
    @Input() productPackages;
}
