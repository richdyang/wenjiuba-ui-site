import {Component, Input, OnInit} from '@angular/core';

import {ApiService} from "../../shared/services/api";
import {EventBus} from "../../shared/services/event";

@Component({
    selector: 'question-list',
    templateUrl: './question-list.html',
    styles: []
})
export class QuestionListComponent implements OnInit {

    static resolve = [
        {
            token: 'questions',
            deps: [ApiService],
            resolveFn: (api) => api.get('/questions')
        }
    ]

    @Input() questions: any[];

    showAddForm = false;

    topQuestions = [];

    constructor(private eventService: EventBus) {}

    ngOnInit():void {
        this.eventService.questionCreated.subscribe((question) => {
            this.questions.unshift(question)
        })
    }


    // onTypeTag(q) {
    //     return this.rest.getTags(q)
    // }

}
