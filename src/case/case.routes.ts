import {CaseListComponent} from "./components/case-list";
import {CaseNewComponent} from "./components/case-new";

export const states:any[] = [
    {
        name: 'cases',
        url:  '/cases',
        component: CaseListComponent,
        resolve: CaseListComponent.resolve,
        parent: 'base'
    },
    {
        name: 'cases.new',
        url: '/new',
        views:
        {
            'cases-new@base': {component: CaseNewComponent}
        },
        peek: true
    },
]
