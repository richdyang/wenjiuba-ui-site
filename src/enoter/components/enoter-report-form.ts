import {Component, OnInit, Input} from '@angular/core';
import {ApiService} from "../../shared/services/api";
import {MenuItem} from "../../widget/common/api";
import {DictService} from "../../shared/services/dict";
import {Transition, UIRouter} from "@uirouter/angular";

@Component({
    selector: 'enoter-report-form',
    template: require('./enoter-report-form.html'),
    providers: [],
    styles: [],
})
export class EnoterReportFormComponent implements OnInit {
    @Input() pageHeader = 'e络通信息';

    static resolve = [
        {
            token: 'package',
            deps: [ApiService,Transition],
            resolveFn: (api, transition) => api.get(`/enoter/packages/default`)
        },
        {
            token: 'experts',
            deps: [ApiService,Transition],
            resolveFn: (api, transition) => api.get(`/experts`)
        },
    ]

    constructor(public apiService: ApiService, private dict:DictService, private router: UIRouter) {}

    // ui control
    private steps:MenuItem[] = [
        {label: '客人资料'},
        {label: '检测数据'},
        {label: '提交判读'}
    ];
    private activeIndex:number = 0;

    @Input() report:any = {}

    private meridians= [
        {name: '肺', code: 'lu'},
        {name: '心包', code: 'pc'},
        {name: '心', code: 'ht'},
        {name: '小肠', code: 'si'},
        {name: '三焦', code: 'te'},
        {name: '大肠', code: 'li'},
        {name: '脾', code: 'sp'},
        {name: '肝', code: 'lr'},
        {name: '肾', code: 'ki'},
        {name: '膀胱', code: 'bl'},
        {name: '胆', code: 'gb'},
        {name: '胃', code: 'st'},
    ]

    @Input() package;
    @Input() experts:any[];

    ngOnInit():void {
        this.experts = this.experts.map(expert => ({id: expert.id, text: expert.fullName}))
    }

    availableExperts(exclude:number) {
        let selectedExpert = this.report[`expert${exclude}`];
        return this.experts.filter(expert => expert.id !== selectedExpert );
    }

    submit() {
        this.apiService.post('/enoter/reports', this.report).then((report) => {
            if(report.paymentInd === 'UNPAID') {
                this.apiService.get(`/alipay/presubmit?businessType=ENOTER_REPORT&businessId=${report.id}`).then(alipayTrade => {
                    this.router.stateService.go('enoter.reports.report.payment', {reportId: report.id, alipayTrade: alipayTrade});
                })
            }
        })
    }

}
