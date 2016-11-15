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
            this.streamEvents = streamEvents
            this.streamEvents.map(streamEvent => {
                if(streamEvent.type == 'answer') {
                    streamEvent.title = streamEvent.questionTitle
                    streamEvent.uiSref = 'questions.detail'
                    streamEvent.uiParams = {id: streamEvent.questionId}
                    streamEvent.iconClasses = 'fa fa-quote-left'
                }
                if(streamEvent.type == 'question') {
                    streamEvent.uiSref = 'questions.detail'
                    streamEvent.uiParams = {id: streamEvent.questionId}
                    streamEvent.link = `/questions/${streamEvent.id}`
                    streamEvent.iconClasses = 'fa fa-question'
                }
            })
          this.streamEvents.push({
            title: 'xxxxxxxxx',
            content: 'xfdfdgdgdgdgdggxfdfdgdgdgdgdggxfdfdgdgdgdgdggxfdfdgdgdgdgdggxfdfdgdgdgdgdggxfdfdgdgdgdgdggxfdfdgdgdgdgdggxfdfdgdgdgdgdggxfdfdgdgdgdgdgg',
            iconClasses: 'fa fa-car'
          })
          this.streamEvents.push({
            title: 'xxxxxxxxx',
            content: 'xfdfdgdgdgdgdgg',
            iconClasses: 'fa fa-car'
          })
          this.streamEvents.push({
            title: 'xxxxxxxxx',
            content: 'xfdfdgdgdgdgdgg',
            iconClasses: 'fa fa-car'
          })
          this.streamEvents.push({
            title: 'xxxxxxxxx',
            content: 'xfdfdgdgdgdgdgg',
            iconClasses: 'fa fa-car'
          })
          this.streamEvents.push({
            title: 'xxxxxxxxx',
            content: 'xfdfdgdgdgdgdgg',
            iconClasses: 'fa fa-car'
          })
        });
    }
}
