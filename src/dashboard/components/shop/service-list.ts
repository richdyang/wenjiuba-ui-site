import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api";
import {DictService} from "../../../shared/services/dict";

@Component({
    selector: 'service-list',
    templateUrl: './service-list.html',
    styles: [],
    providers: [],
})
export class ServiceListComponent {
    constructor(private api: ApiService, private dict: DictService) {}

    static resolve = [
        {
            token: 'services',
            deps: [ApiService],
            resolveFn: (api) => api.get('/shops/default/services')
        },
        {
            token: 'servicePackages',
            deps: [ApiService],
            resolveFn: (api) => api.get('/shops/default/services/packages')
        },
    ]

    @Input() services;
    @Input() servicePackages;
}
