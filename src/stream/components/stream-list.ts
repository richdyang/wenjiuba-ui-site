import {Component} from '@angular/core';
import {SessionService} from "../../shared/services/session";
import {ApiService} from "../../shared/services/api";
import {UIRouter} from "@uirouter/angular";

@Component({
    selector: 'stream-list',
    templateUrl: './stream-list.html',
    styles: [],
    providers: [],
})
export class StreamListComponent {
    streamEvents: any[] = []

    constructor(public session:SessionService, public apiService:ApiService, private router: UIRouter) {
        this.apiService.get('/me/stream').then(streamEvents => {
            this.streamEvents = streamEvents.map(streamEvent => {
                if(streamEvent.type == 'answer') {
                    streamEvent.title = streamEvent.questionTitle
                    streamEvent.uiSref = 'questions.detail'
                    streamEvent.uiParams = {id: streamEvent.questionId}
                    streamEvent.iconClasses = 'wj-icon wj-answer'
                    streamEvent.date = streamEvent.happenedAt
                }
                if(streamEvent.type == 'question') {
                    streamEvent.uiSref = 'questions.detail'
                    streamEvent.uiParams = {id: streamEvent.id}
                    streamEvent.link = `/questions/${streamEvent.id}`
                    streamEvent.iconClasses = 'wj-icon wj-qanda'
                    streamEvent.date = streamEvent.happenedAt
                }
                return streamEvent;
            })
        });
    }
}
