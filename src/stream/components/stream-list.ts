import {Component} from '@angular/core';
import {SessionService} from "../../shared/services/session";
import {ApiService} from "../../shared/services/api";
import {UIRouter} from "ui-router-ng2/ng2";

@Component({
    selector: 'stream-list',
    templateUrl: './stream-list.html',
    styles: [],
    providers: [],
})
export class StreamListComponent {
    streamEvents: any[] = []

    static resolve() {

    }

    constructor(public session:SessionService, public apiService:ApiService, private router: UIRouter) {
        this.apiService.get('/me/stream').then(streamEvents => {
            this.streamEvents = streamEvents.map(streamEvent => {
                if(streamEvent.type == 'answer') {
                    streamEvent.title = streamEvent.questionTitle
                    streamEvent.uiSref = 'questions.detail'
                    streamEvent.uiParams = {id: streamEvent.questionId}
                    streamEvent.iconClasses = 'wj-icon wj-answer'
                }
                if(streamEvent.type == 'question') {
                    streamEvent.uiSref = 'questions.detail'
                    streamEvent.uiParams = {id: streamEvent.id}
                    streamEvent.link = `/questions/${streamEvent.id}`
                    streamEvent.iconClasses = 'wj-icon wj-qanda'
                }
                return streamEvent;
            })
        });
    }
}
