import {Component, OnInit, Input, ViewChild, Output, EventEmitter, ViewContainerRef} from '@angular/core';
import {ApiService, API_BASE} from "../services/api";
import {DictService} from "../services/dict";
import {Transition, UIRouter} from "@uirouter/angular";
import {SessionService} from "../services/session";
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'payment',
    template: require('./payment.html'),
    providers: [],
    styles: [],
})
export class PaymentComponent {
    private paymentSubmitUrl: string = API_BASE + "/alipay/submit"

    @Input() alipayTrade: any|AlipayTrade = {};
    @Input() returnTo: string;

    static resolve = [
        {
            token: 'alipayTrade',
            deps: [ApiService,Transition],
            resolveFn: (api, transition:Transition) => {
                return transition.params()['alipayTrade']
            }
        },
        {
            token: 'returnTo',
            deps: [ApiService,Transition],
            resolveFn: (api, transition:Transition) => {
                return transition.params()['returnTo']
            }
        }
    ]

    @ViewChild('resultModal') resultModal:ModalDirective;

    goto() {
        this.router.stateService.go(this.returnTo, null, {inherit: true})
    }

    constructor(public apiService: ApiService, private session:SessionService, private router: UIRouter) {
    }
}

export interface AlipayTrade {
    tradeNo:string,
    subject:string,
    totalFee:string,
    body:string,
    link?:string
}
