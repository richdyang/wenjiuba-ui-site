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
        dict.display('enoterReport.reviewInd', report.expert1ReviewInd) + '/' +
        dict.display('enoterReport.reviewInd', report.expert2ReviewInd) : '-'
        }}
        </td>
        <td>{{report.createdAt | date: 'yyyy-MM-dd HH:mm'}}</td>
        <td class="text-right">
            <button class="btn btn-default btn-circle-micro" uiSref="expert.enoter-reports.report.review" [uiParams]="{reportId: report.id}" tooltip="查看" placement="bottom" *ngIf="report.publishInd !== 'YES'">
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
