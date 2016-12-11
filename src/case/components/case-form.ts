import {FormGroup, FormBuilder} from "@angular/forms";
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {ApiService} from "../../shared/services/api";

@Component({
    selector: 'case-form',
    template: `
    <div class="page-header">
        <h4>案例</h4>
    </div>
    
    <form #caseForm="ngForm">
        <p-form-field label="案例内容 *">
            <p-editor [(ngModel)]="case.content" name="content" required mintextlength="20" [uploadHandler]="api.uploadHandler" >
            </p-editor>
        </p-form-field>

        <button [disabled]="!caseForm.valid" class="btn btn-primary" (click)="onSave()">保存</button>
    </form>
    `
})
export class CaseFormComponent {

    @Input()
    case: any = {};

    @Output()
    saved: EventEmitter<any> = new EventEmitter(true);

    @Output()
    canceled: EventEmitter<any> = new EventEmitter(true);

    constructor(private api:ApiService) {}

    onSave() {
        this.api.save('/cases', this.case).then(_case => {
            this.saved.emit(_case)
        })
    }

    onCancel() {
        this.canceled.emit(null)
    }
}
