import {Component, OnInit, Input} from '@angular/core';
import {ApiService, API_BASE} from "../services/api";
import {DictService} from "../services/dict";
import {Transition, UIRouter} from "ui-router-ng2/ng2";
import {SessionService} from "../services/session";

@Component({
    selector: 'payment',
    template: require('./payment.html'),
    providers: [],
    styles: [],
})
export class PaymentComponent {
    private paymentSubmitUrl: string = API_BASE + "/alipay/submit"

    @Input() alipayTrade: any|AlipayTrade = {};

    static resolve = [
        {
            token: 'alipayTrade',
            deps: [ApiService,Transition],
            resolveFn: (api, transition:Transition) => {
                return transition.params()['alipayTrade']
            }
        }
    ]

    constructor(public apiService: ApiService, private session:SessionService, private router: UIRouter) {}
}

export interface AlipayTrade {
    tradeNo:string,
    subject:string,
    totalFee:string,
    body:string,
    link?:string
}
