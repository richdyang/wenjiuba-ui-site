import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../shared/services/api";
import {MenuItem} from "../../widget/common/api";
import {DictService} from "../../shared/services/dict";
import {Transition} from "ui-router-ng2/ng2";

@Component({
    selector: 'enoter-report-form',
    template: require('./enoter-report-form.html'),
    providers: [],
    styles: [],
})
export class EnoterReportFormComponent implements OnInit {
    ngOnInit():void {
        this.packageOptions = [
            {label: '机器人判读', value: 'R'},
            {label: '专家判读', value: 'E'},
        ]
    }
    static resolve = [
        {
            token: 'package',
            deps: [ApiService,Transition],
            resolveFn: (api, transition) => api.get(`/enoter/packages/default`)
        },
    ]

    constructor(public apiService: ApiService, private dict:DictService, private router: Router) {}

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
    private packageOptions;

    submit() {
        this.report.robotRequestInd = this.report.requestPackage === 'R' ? 'Y': 'N';
        this.report.expertRequestInd = this.report.requestPackage === 'E' ? 'Y' : 'N';
        this.apiService.post('/enoter/reports', this.report)
    }
}
