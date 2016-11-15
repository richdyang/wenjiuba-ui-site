import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../shared/services/api";
import {EventBus} from "../../shared/services/event";

@Component({
    selector: 'case-list',
    templateUrl: './case-list.html',
    styles: []
})
export class CaseListComponent implements OnInit {


    static resolve = [
        {
            token: 'cases',
            deps: [ApiService],
            resolveFn: (api: ApiService) => api.get('/cases')
        }
    ]

    @Input() cases

    ngOnInit():void {
        this.eventService.caseCreated.subscribe((question) => {
            this.cases.unshift(question)
        })
    }

    constructor(private api:ApiService, private eventService: EventBus) {}

    showAddForm = false;

    private loadComments(_case:any) {

        this.api.get(`/cases/${_case.id}/comments`).then(comments => {
            _case.comments = comments;
        });
    }

}
