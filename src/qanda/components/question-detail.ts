import {Component, OnInit, Input} from '@angular/core';
import {SessionService} from "../../shared/services/session";
import {ApiService} from "../../shared/services/api";
import {Transition} from "@uirouter/angular";

@Component({
  selector: 'question-detail',
  templateUrl: './question-detail.html'
})
export class QuestionDetailComponent implements OnInit {

  static resolve = [
    {
      token: 'question',
      deps: [ApiService, Transition],
      resolveFn: (api, transition) => api.get(`/questions/${transition.params().id}`)
    }
  ]

  id:string;

  @Input() question;

  myanswer = null;

  constructor(private api: ApiService, private session:SessionService) {

  }

  ngOnInit():any {
        if(this.session.logined) {
          let answers:any[] = this.question['answers'] || [];
          let myanswers:any[] = answers.filter( answer => answer.creator.id == this.session.currentUser.id );
          if(myanswers.length > 0) this.myanswer = myanswers[0];
        }
  }

  deleteAnswer(answer) {
    this.api.delete(`/questions/${this.question['id']}/answers/${answer.id}`).then( e => {
      let answers:any[] = this.question['answers'];
      var i = answers.indexOf(answer);
      if(i != -1) {
        answers.splice(i, 1);
      }
      this.myanswer=null;
    });
  }

  private canVote(answer):boolean {
    return this.session.logined && this.session.currentUser.id != answer.creator.id
  }

  private canModify(answer):boolean {
    return this.session.logined && this.session.currentUser.id == answer.creator.id;
  }

}
