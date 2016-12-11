import {EnoterComponent} from "./components/enoter";
import {EnoterReportFormComponent} from "./components/enoter-report-form";
import {EnoterReportListComponent} from "./components/enoter-report-list";
import {PaymentComponent} from "../shared/components/payment";

export const states:any[] = [
    {
        name: 'enoter',
        url:  '/enoter',
        component: EnoterComponent,
        resolve: EnoterComponent.resolve,
        parent: 'base'
    },
    {
        name: 'enoter.reports',
        url:  '/reports',
        resolve: EnoterReportListComponent.resolve,
        views:
        {
            'enoter-reports@base': {component: EnoterReportListComponent}
        },
        peek: true
    },
    {
        name: 'enoter.reports.new',
        url:  '/new',
        resolve: EnoterReportFormComponent.resolve,
        views:
        {
            'enoter-reports-new@base': {component: EnoterReportFormComponent}
        },
        peek: true
    },
    {
        name: 'enoter.reports.report',
        url:  '/{reportId:int}',
        abstract: true,
    },
    {
        name: 'enoter.reports.report.payment',
        url: '/payment',
        views:
        {
            'enoter-reports-report-payment@base': {component: PaymentComponent}
        },
        params: {
            alipayTrade: { }
        },
        resolve: PaymentComponent.resolve,
        peek: true
    },

]
