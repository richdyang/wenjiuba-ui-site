import {QuestionListComponent} from "./components/question-list";
import {QuestionDetailComponent} from "./components/question-detail";
import {QuestionSettingComponent} from "./components/question-setting";
import {QuestionFormComponent} from "./components/question-form";

export const states = [
    {
        name: 'questions',
        url:  '/questions',
        component: QuestionListComponent,
        resolve: QuestionListComponent.resolve,
        parent: 'base'
    },
    {
        name: 'questions.new',
        url: '/new',
        views:
        {
            'questions-new@base': {component: QuestionFormComponent}
        },
        peek: true
    },
    {
        name: 'questions.detail',
        url: '/:id',
        views:
        {
            'questions-detail@base': {component: QuestionDetailComponent}
        },
        params: {
            id: {type: "int"}
        },
        peek: true,
        resolve: QuestionDetailComponent.resolve
    },
    {
        name: 'questions.detail.setting',
        url: '/setting',
        views:
        {
            'questions-detail-setting@base': {component: QuestionSettingComponent}
        },
        peek: true
    },
]
