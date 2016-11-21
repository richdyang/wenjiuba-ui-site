import {EnoterComponent} from "./components/enoter";
import {EnoterReportFormComponent} from "./components/enoter-report-form";
import {EnoterReportListComponent} from "./components/enoter-report-list";

export const states:any[] = [
    {
        name: 'enoter',
        url:  '/enoter',
        component: EnoterComponent,
        resolve: EnoterComponent.resolve,
        parent: 'base'
    },
    {
        name: 'enoter.reports-list',
        url:  '/reports',
        resolve: EnoterReportListComponent.resolve,
        views:
        {
            'enoter-reports-list@base': {component: EnoterReportListComponent}
        },
        peek: true
    },
    {
        name: 'enoter.reports-new',
        url:  '/reports/new',
        resolve: EnoterReportFormComponent.resolve,
        views:
        {
            'enoter-reports-new@base': {component: EnoterReportFormComponent}
        },
        peek: true
    },

]
