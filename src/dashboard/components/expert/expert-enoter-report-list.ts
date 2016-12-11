import {Component, OnInit, Input} from '@angular/core';
import {Transition} from "ui-router-ng2/ng2";
import {ApiService} from "../../../shared/services/api";

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
        <td>{{report.requestInd === 'E' ? '专家判读' : '机器人判读'}}</td>
        <td>{{report.paymentInd === 'Y' ? '已付款' : '等待付款'}}</td>
        <td>{{report.reviewInd === 'F' ? '报告已出' : report.reviewInd === 'O' ? '正在判读' : '没有开始' }}</td>
        <td>{{report.createdAt | date: 'yyyy-MM-dd HH:mm'}}</td>
        <td class="text-right">
            <a class="btn btn-default btn-circle-micro" uiSref="expert.enoter-reports.enoter-report.edit" [uiParams]="{id: report.id}" *ngIf="report.publishInd !== 'Y'">
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
export class ExpertEnoterReportListComponent {

    static resolve = [
        {
            token: 'reports',
            deps: [ApiService,Transition],
            resolveFn: (api, transition) => api.get(`/enoter/reports`)
        },
    ]

    constructor(private api:ApiService) {}

    //resolve
    @Input() reports: any[] = []



}
