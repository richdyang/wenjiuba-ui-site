import {Component, OnInit, Input} from '@angular/core';
import {ApiService} from "../../shared/services/api";
import {Transition} from "ui-router-ng2/ng2";
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
        <td>{{dict.display('enoter.requestPackages', report.requestPackageInd)}}</td>
        <td>{{dict.display('enoter.payments', report.paymentInd)}}</td>
        <td>{{dict.display('enoter.reviews', report.robotReviewInd)}}</td>
        <td>
        {{dict.display('enoter.reviews', report.expert1ReviewInd)}}
        /
        {{dict.display('enoter.reviews', report.expert2ReviewInd)}}
        </td>
        <td>{{report.createdAt | date: 'yyyy-MM-dd HH:mm'}}</td>
        <td class="text-right">
            <a class="btn btn-default btn-circle-micro" uiSref="payment" [uiParams]="{id: report.id}" *ngIf="report.paymentInd !== 'Y'">
                <i class="fa fa-paypal"></i>
            </a>
            <a class="btn btn-default btn-circle-micro" uiSref="enoter.reports-detail" [uiParams]="{id: report.id}" *ngIf="canViewReport(report)">
                <i class="fa fa-eye"></i>
            </a> 
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

    constructor(private apiService:ApiService, private dict:DictService) {}

    //resolve

    @Input() reports: any[] = []

    private canViewReport(report:any) {
        if(report.requestPackageInd === 'R') {
            return report.robotReviewInd === 'F';
        }
        if(report.requestPackageInd === 'E') {
            return report.expert1ReviewInd === 'F' && report.expert2ReviewInd === 'F';
        }
    }

}
