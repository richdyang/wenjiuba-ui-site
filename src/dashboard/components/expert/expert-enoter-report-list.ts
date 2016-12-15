import {Component, OnInit, Input} from '@angular/core';
import {Transition} from "ui-router-ng2/ng2";
import {ApiService} from "../../../shared/services/api";
import {DictService} from "../../../shared/services/dict";

@Component({
    selector: 'expert-enoter-report-list',
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
        <th>判读状态</th>
        <th>日期</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let report of reports">
        <td>{{report.fullName}}</td>
        <td>{{dict.display('enoter.requestPackages', report.requestPackageInd)}}</td>
        <td>{{dict.display('enoter.payments', report.paymentInd)}}</td>
        <td>{{dict.display('enoter.reviews', reviewInd(report))}}</td>
        <td>{{report.createdAt | date: 'yyyy-MM-dd HH:mm'}}</td>
        <td class="text-right">
            <button class="btn btn-default btn-circle-micro" uiSref="expert.enoter-reports.report.review" [uiParams]="{reportId: report.id}" *ngIf="report.publishInd !== 'Y'">
                <i class="wj-icon wj-view"></i>
            </button> 
        </td>
      </tr>
      </tbody>
    </table>
    `,
    providers: [],
    styles: [],
})
export class ExpertEnoterReportListComponent {

    constructor(private api:ApiService, private dict:DictService) {}

    //resolve
    @Input() expert:any; // from parent route
    @Input() reports: any[] = []

    private reviewInd(report):string {
        if(this.expert.id === report.expert1) {
            return report.expert1ReviewInd;
        }
        if(this.expert.id === report.expert2) {
            return report.expert2ReviewInd;
        }
    }
}
