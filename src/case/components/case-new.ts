import {FormGroup, FormBuilder} from "@angular/forms";
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {ApiService} from "../../shared/services/api";
import {EventBus} from "../../shared/services/event";

@Component({
    selector: 'case-new',
    template: `
    <div class="panel">
        <div class="panel-body" >
            <case-form (saved)="eventService.caseCreated.next($event)"></case-form>
        </div>
    </div>
    `,
})
export class CaseNewComponent {
    constructor(private eventService: EventBus) {}

}
