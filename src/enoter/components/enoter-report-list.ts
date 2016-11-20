import {Component, OnInit, Input} from '@angular/core';
import {ApiService} from "../../shared/services/api";
import {Transition} from "ui-router-ng2/ng2";

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
        <th>判读状态</th>
        <th>日期</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let report of reports">
        <td><a uiSref="enoter.reports-detail" [uiParams]="{id: report.id}">{{report.fullName}}</a></td>
        <td>{{report.expertRequestInd === 'Y' ? '专家判读' : '机器人判读'}}</td>
        <td>{{report.expertPaymentInd === 'Y' || report.robotPaymentInd === 'Y' ? '已付款' : '等待付款'}}</td>
        <td>{{report.expertReport || report.robotReport ? '报告已出' : '正在判读'}}</td>
        <td>{{report.createdAt | date: 'yyyy-MM-dd HH:mm'}}</td>
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

    constructor(private apiService:ApiService) {}

    //resolve
    @Input() reports: any[] = []


}
