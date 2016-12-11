import {FormGroup, FormBuilder} from "@angular/forms";
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {ApiService} from "../../shared/services/api";

@Component({
    selector: 'answer-form',
    template: `  
    <form #answerForm="ngForm">
        <p-form-field label="内容 *">
            <p-editor [(ngModel)]="answer.content" [uploadHandler]="api.uploadHandler" name="content" required mintextlength="20">
            </p-editor>
        </p-form-field>
        <button class="btn btn-info" [disabled]="!answerForm.valid" (click)="onSave()">保存</button>
        <button class="btn btn-default" (click)="onCancel()">取消</button>
    </form>
    `,
})
export class AnswerFormComponent {

    @Input()
    answer: any = {};

    @Input()
    question: any = {};

    @Output()
    saved: EventEmitter<any> = new EventEmitter(true);

    @Output()
    canceled: EventEmitter<any> = new EventEmitter(true);

    constructor(private api:ApiService) {}

    onSave() {
        this.api.save(`/questions/${this.question.id}/answers`, this.answer).then(answer => {
            this.saved.emit(answer)
        })
    }

    onCancel() {
        // this.answerService.save(this.answer, this.question.id).then(answer => {
            this.canceled.emit(null)
        // })

    }
}
