import {FormGroup, FormBuilder} from "@angular/forms";
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {ApiService} from "../../shared/services/api";

@Component({
    selector: 'comment-form',
    template: `
    <form [formGroup]="commentForm" class="form-inline">
        <div class="form-group">
          <input type="text" [(ngModel)]="comment.content" formControlName="content" required placeholder="写评论"
          class="form-control input-sm" style="width: 30em">
        </div>

        <button type="submit" class="btn btn-default btn-sm" (click)="onSave()" [disabled]="!commentForm.valid">提交</button>
        <button type="submit" class="btn btn-link btn-sm" (click)="onCancel()">取消</button>
    </form>
    `
})
export class CommentFormComponent {

    @Input()
    comment: any = {};

    @Input()
    case: any = {};

    @Output()
    saved: EventEmitter<any> = new EventEmitter(true);

    @Output()
    canceled: EventEmitter<any> = new EventEmitter(true);

    commentForm: FormGroup;
    constructor(fb: FormBuilder, private api:ApiService) {
        this.commentForm = fb.group({
            content: ['']
        });
    }

    onSave() {
        this.api.save(`/cases/${this.case.id}/comments`, this.comment).then(comment => {
            this.saved.emit(comment);
            this.comment = {}
        })
    }

    onCancel() {
        this.canceled.emit(null)
        this.comment = {}
    }
}
