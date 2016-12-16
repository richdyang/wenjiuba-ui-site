import {Component, OnInit, Input} from '@angular/core';
import {Transition, UIRouter} from "ui-router-ng2/ng2";
import {ApiService} from "../../shared/services/api";
import {DictService} from "../../shared/services/dict";

@Component({
    selector: 'enoter-report-detail',
    template: `
    <div class="page-header">
        <h4>e络通判读</h4>
    </div>
    
    <tabset>
      <tab heading='客户基本信息'>
        <div class="well well-sm">
            <h5>{{report.fullName}}</h5>
            <p>年龄：{{report.age}}</p>
            <p>性别：{{dict.display('genders', report.gender)}}</p>
            <p *ngIf="report.gender === 'F'">
            月经情况：{{dict.display('menses', report.menses)}}
            </p>
            <p>身高：{{report.height}} cm</p>
            <p>体重：{{report.weight}}</p>
            <p>血压：{{report.bpLow}} ～ {{report.bpHigh}}</p>
            
        </div>
          
        <table class="table table-bordered text-center">
            <thead>
            <tr>
              <th rowspan="3" colspan="2" style="vertical-align: middle">十二经</th>
              <th colspan="5">左</th>
              <th colspan="5">右</th>
            </tr>
            
            <tr>
              <td colspan="2">低能量-虚症</td>
              <td>正常</td>
              <td colspan="2">高能量-实症</td>
            
              <td colspan="2">低能量-虚症</td>
              <td>正常</td>
              <td colspan="2">高能量-实症</td>
            </tr>
            
            <tr style="font-size: .9em">
              <td>L2/{{(report.average*0.6).toFixed(2)}}</td>
              <td>L1/{{(report.average*0.8).toFixed(2)}}</td>
              <td>Avg/{{report.average.toFixed(2)}}</td>
              <td>H1/{{(report.average*1.2).toFixed(2)}}</td>
              <td>H1/{{(report.average*1.5).toFixed(2)}}</td>
            
              <td>L2/{{(report.average*0.6).toFixed(2)}}</td>
              <td>L1/{{(report.average*0.8).toFixed(2)}}</td>
              <td>Avg/{{report.average.toFixed(2)}}</td>
              <td>H1/{{(report.average*1.2).toFixed(2)}}</td>
              <td>H1/{{(report.average*1.5).toFixed(2)}}</td>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let meridian of meridians; let order = index">
              <td style="font-size: .8em">{{order+1}}</td>
              <td class="text-center text-danger">
                 {{meridian.name}}经
              </td>
            
              <td *ngFor="let ll of [-2, -1, 0, 1, 2]; let i = index"
                  [ngClass]="{
                            success: level('l' + meridian.code)==ll && i==2,
                            danger: level('l' + meridian.code)==ll && (i==0 || i==4),
                            warning: level('l' + meridian.code)==ll && (i==1 || i==3)
                        }">
                <span *ngIf="level('l' + meridian.code)==ll">{{report['l' + meridian.code]}}</span>
              </td>
            
              <td *ngFor="let lr of [-2, -1, 0, 1, 2]; let i = index"
                  [ngClass]="{
                            success: level('r' + meridian.code)==lr && i==2,
                            danger: level('r' + meridian.code)==lr && (i==0 || i==4),
                            warning: level('r' + meridian.code)==lr && (i==1 || i==3)
                        }">
                <span *ngIf="level('r' + meridian.code)==lr">{{report['r' + meridian.code]}}</span>
              </td>
            
            
            </tr>
            </tbody>
            </table>
            
            <div style="display: block">
            <canvas baseChart
                  [datasets]="[{data: [report.yinyang, report.limb, report.side, report.extremum], label: '五行'}]"
                  [labels]="['阴阳比值/新陈代谢', '上下比值/精神状态', '左右比值/筋骨气血', '大小比值/植物神经']"
                  chartType="radar"
                  (chartHover)="chartHovered($event)"
                  (chartClick)="chartClicked($event)"></canvas>
            </div>
      </tab>
      
      <tab heading="机器人判读">
        <p class="text-justify" [innerHtml]="report.robotReport"></p>
      </tab>
      
      <tab heading="专家1判读 - {{report.expert1}}">
        <p class="text-justify" [innerHtml]="report.expert1Report"></p>
      </tab>
      
      <tab heading="专家2判读 - {{report.expert2}}">
        <p class="text-justify" [innerHtml]="report.expert2Report"></p>
      </tab>
    </tabset>
    `,
    providers: [],
    styles: [],
})
export class EnoterReportDetailComponent {

    constructor(private api: ApiService, private dict:DictService, private router: UIRouter) {
    }

    //resolve
    @Input() report: any = {}

    private meridians = [
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

    private level(meridian): number {
        let average0_6 = (this.report.average * 0.6).toFixed(2)
        let average0_8 = (this.report.average * 0.8).toFixed(2)
        let average1_2 = (this.report.average * 1.2).toFixed(2)
        let average1_5 = (this.report.average * 1.5).toFixed(2)

        let energy = this.report[meridian]
        if (energy < average0_6) return -2;
        if (energy >= average0_6 && energy < average0_8) return -1;
        if (energy >= average0_8 && energy <= average1_2) return 0;
        if (energy > average1_2 && energy <= average1_5) return 1;
        if (energy > average1_5) return 2;
    }
}
