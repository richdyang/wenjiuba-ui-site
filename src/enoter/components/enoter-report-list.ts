import {Component, OnInit, Input} from '@angular/core';
import {ApiService} from "../../shared/services/api";
import {Transition, UIRouter} from "@uirouter/angular";
import {DictService} from "../../shared/services/dict";

@Component({
    selector: 'enoter-report-list',
    template: `
    <div class="page-header">
        <h4>e络通判读</h4>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th>评估人</th>
        <th>判读套餐</th>
        <th>支付状态</th>
        <th>机器人判读状态</th>
        <th>专家判读状态</th>
        <th>日期</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let report of reports">
        <td>{{report.fullName}}</td>
        <td>{{dict.display('enoterReport.requestPackageInd', report.requestPackageInd)}}</td>
        <td>{{dict.display('enoterReport.paymentInd', report.paymentInd)}}</td>
        <td>{{dict.display('enoterReport.reviewInd', report.robotReviewInd)}}</td>
        <td>
        {{report.requestPackageInd === 'EXPERT' ? 
        dict.display('enoterReport.reviewInd', report.expert1ReviewInd) : '-'
        }}
        </td>
        <td>{{report.createdAt | date: 'yyyy-MM-dd HH:mm'}}</td>
        <td class="text-right">
            <button class="btn btn-default btn-circle-micro" tooltip="支付" placement="bottom" *ngIf="report.paymentInd !== 'PAID'" (click)="pay(report)">
                <i class="wj-icon wj-alipay"></i>
            </button>
            <button class="btn btn-default btn-circle-micro" uiSref="enoter.reports.report.detail" [uiParams]="{reportId: report.id}" tooltip="查看" placement="bottom" *ngIf="canViewReport(report)">
                <i class="wj-icon wj-view fa"></i>
            </button> 
        </td>
      </tr>
      </tbody>
    </table>
    `,
    providers: [],
    styles: [],
})
export class EnoterReportListComponent {

    static resolve = [
        {
            token: 'reports',
            deps: [ApiService,Transition],
            resolveFn: (api, transition) => api.get(`/enoter/reports`)
        },
    ]

    constructor(private api:ApiService, private dict:DictService, private router:UIRouter) {}

    //resolve

    @Input() reports: any[] = []
    modalShown = false;

    private canViewReport(report:any) {
        if(report.requestPackageInd === 'ROBOT') {
            return report.robotReviewInd === 'FINISHED';
        }
        if(report.requestPackageInd === 'EXPERT') {
            return report.expert1ReviewInd === 'FINISHED' //&& report.expert2ReviewInd === 'FINISHED';
        }
    }

    private pay(report) {
        if(report.paymentInd !== 'UNPAID') return;
        this.api.get(`/alipay/presubmit?businessType=ENOTER_REPORT&businessId=${report.id}`).then(alipayTrade => {
            this.router.stateService.go('enoter.reports.report.payment', {reportId: report.id, alipayTrade: alipayTrade});
        })
    }

}
