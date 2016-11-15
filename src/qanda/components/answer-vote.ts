import {Component, Input, Output, OnInit} from "@angular/core";
import {ApiService} from "../../shared/services/api";
import {SessionService} from "../../shared/services/session";

@Component({
    selector: 'answer-vote',
    template: `
    <span class="answer-action-votes">

        <span class="action-button" *ngIf="answer.cannot_vote">
            好评
            <span class="upvote-num">
                {{answer.statUpvote}}
            </span>
        </span>
        
        <span ng-if="!answer.cannot_vote">
            <a class="answer-action-vote action-button" *ngIf="voteStatus != 1" (click)="voteAnswer(1)">
                好评
                <span class="upvote-num">
                    {{answer.statUpvote}}
                </span>
            </a>
            <a class="answer-action-vote action-button-toggled" *ngIf="voteStatus == 1" (click)="voteAnswer(0)">
                <span class="glyphicon glyphicon-thumbs-up"></span>
                已好评
                <span class="upvote-num">
                    {{answer.statUpvote}}
                </span>
            </a>
            <a class="answer-action-vote action-link" *ngIf="voteStatus != -1" (click)="voteAnswer(-1)">差评</a>
            <a class="answer-action-vote action-link" *ngIf="voteStatus == -1" (click)="voteAnswer(0)">
                <span class="glyphicon glyphicon-thumbs-down"></span>
                已差评
            </a>
        </span>
    </span>
    `,
    providers: []
})
export class AnswerVoteComponent implements OnInit{

    ngOnInit():any {
        this.loadVoteStatus();
    }

    @Input()
    answer: any = {};

    @Input()
    question: any = {};

    private voteStatus;

    // @Output()
    // voted: EventEmitter<any> = new EventEmitter(true);

    constructor(private api:ApiService, private session:SessionService) {

    }

    voteAnswer(to) {
        this.api.get(`/questions/${this.question['id']}/answers/${this.answer.id}/vote?to=${to}`)
            .then(votedAnswer => {
                this.answer = votedAnswer;
                this.loadVoteStatus();
            });
    }

    private loadVoteStatus() {
        this.voteStatus = this._voteStatus();
    }

    private _voteStatus() {
        if(!this.session.logined) return 0;
        let answerVotes:any[] = this.answer.answerVotes || [];
        answerVotes = answerVotes.filter(answerVote => answerVote.userId == this.session.currentUser.id);
        if(answerVotes.length == 0) return 0;

        if(answerVotes.every(answerVote => answerVote.vote == 1)) return 1;
        if(answerVotes.every(answerVote => answerVote.vote == -1)) return -1;
    }
}
