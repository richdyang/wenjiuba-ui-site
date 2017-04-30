import {Component, OnInit, Input} from '@angular/core';
import {Transition, UIRouter} from "@uirouter/angular";
import {ApiService} from "../../../shared/services/api";
import {DictService} from "../../../shared/services/dict";
import {MenuItem} from "../../../widget/common/api";

@Component({
    selector: 'expert-form',
    template: require('./expert-form.html'),
    providers: [],
    styles: [],
})
export class ExpertFormComponent implements OnInit {


    ngOnInit():void {
    }

    invitationCode: string;
    // @Input()
    expert: any = {}
    @Input() expertVerification: any = {}

    // ui control
    private steps:MenuItem[] = [
        {label: '邀请码'},
        {label: '专家信息'},
        {label: '验证信息'}
    ];
    private activeIndex:number = 0;

    constructor(public api: ApiService, private dict:DictService, private router: UIRouter) {}

    submit() {
        this.api.save('/expert', {expert: this.expert, invitationCode: this.invitationCode, expertVerification: this.expertVerification})
            .then(_ => {
                this.router.stateService.go('i', null, {reload: 'i'})
            });
    }

}
