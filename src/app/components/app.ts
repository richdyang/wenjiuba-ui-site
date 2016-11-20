import {Component, OnInit} from '@angular/core';
import {Message} from "../../widget/common/api";
import {EventBus} from "../../shared/services/event";

@Component({
  selector   : 'app',
  templateUrl: `
    <!--<login-modal></login-modal>-->
    <!--<flash></flash>-->
    
    <ui-view></ui-view>
    <p-growl [value]="messages" [life]="5000" [sticky]="false"></p-growl>
  `
})
export class AppComponent implements OnInit {

  ngOnInit():void {
    this.eventBus.httpPostSuccess.subscribe((data) => {
      this.messages.push({severity: 'success', detail: data})
    })
    this.eventBus.httpServerError.subscribe((data) => this.messages.push({severity: 'error', detail: data}))
  }

  constructor(private eventBus: EventBus) {}

  messages:Message[] = []
}
