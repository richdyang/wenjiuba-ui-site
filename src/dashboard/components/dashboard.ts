import {Component, Input, OnInit} from '@angular/core';
import {SessionService} from "../../shared/services/session";
import {ApiService} from "../../shared/services/api";
import {UIRouter} from "ui-router-ng2/ng2";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
    styles: [`
    #banner {
        margin-bottom: 40px;
        margin-left: -30px;
        margin-right: -30px;
        
        padding: 10px 25px 10px 25px;
        height: 65px;
        vertical-align: middle;
        background: rgba(28, 28, 28, 0.89) no-repeat center;
        color: white;
    }
    #banner > div {
        display: inline-block;
    }
    #banner img {
        width: 80px;
        border: 4px solid #efefef;
    }
    .panel-heading {
        background: #e6e6e6;
    }
    `],
    providers: [],
})
export class DashboardComponent {

    streamEvents: any[] = []

    constructor(public session:SessionService, public apiService:ApiService, private router: UIRouter) {

    }

    static resolve = [
        {
            token: 'shop',
            deps: [ApiService],
            resolveFn: (api) => api.get('/shops/default')
        },
        {
            token: 'expert',
            deps: [ApiService],
            resolveFn: (api) => api.get('/experts/default')
        },
        {
            token: 'expertInvitation',
            deps: [ApiService],
            resolveFn: (api) => api.get('/experts/default/invitation')
        }
    ]

    @Input() shop;

    @Input() expert;
    @Input() expertInvitation;


}
