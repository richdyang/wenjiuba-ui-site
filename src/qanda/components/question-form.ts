import {Component, Input, Output, EventEmitter} from "@angular/core";
import {ApiService} from "../../shared/services/api";
import {EventBus} from "../../shared/services/event";

@Component({
    selector: 'question-form',
    template: `
    <form #questionForm="ngForm">
        <p-form-field label="标题 *">
            <input type="text" [(ngModel)]="question.title" class="form-control" name="title" required minlength="10">
        </p-form-field>
        <p-form-field label="内容 *">
            <p-editor [(ngModel)]="question.content" name="content" required mintextlength="20" [uploadHandler]="api.uploadHandler"></p-editor>
        </p-form-field>
        <p-form-field label="标签">
            <p-tag-input [(ngModel)]="question.tags" name="tags"></p-tag-input>
        </p-form-field>
        <p-form-field label="文件">
            <p-file-input [(ngModel)]="question.file" name="file" [uploadOptions]="api.uploadOptions" ></p-file-input>
        </p-form-field>
        
        <button [disabled]="!questionForm.valid" class="btn btn-primary" (click)="onSave()">保存</button>
        <button class="btn btn-default" (click)="onCancel()">取消</button>
    </form>
    {{question.file}}
    `,
})
export class QuestionFormComponent {

    @Input()
    question: any = {};

    @Output()
    saved: EventEmitter<any> = new EventEmitter();

    @Output()
    canceled: EventEmitter<any> = new EventEmitter();


    constructor(private api:ApiService, private eventService: EventBus) {}

    onSave() {
      let question = this.question
      question['tags'] = question['tags'] || []
      question['tags'] = question['tags'].map( tag => tag.name).join(",")

      this.api.save('/questions', question).then(question => {
            this.saved.emit(question);
            this.eventService.questionCreated.next(question);
        })
    }

    onCancel() {
      this.canceled.emit(this.question)
      this.question = {}
    }
}
