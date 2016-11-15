import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {states} from "./qanda.routes";
import {NgModule, ModuleWithProviders} from "@angular/core";
import {QuestionListComponent} from "./components/question-list";
import {QuestionDetailComponent} from "./components/question-detail";
import {QuestionFormComponent} from "./components/question-form";
import {AnswerFormComponent} from "./components/answer-form";
import {AnswerVoteComponent} from "./components/answer-vote";
import {UIRouterModule} from "ui-router-ng2";
import {QuestionSettingComponent} from "./components/question-setting";
import {WidgetModule} from "../widget/widget.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports     : [
    CommonModule, FormsModule, ReactiveFormsModule, HttpModule, // ng
    WidgetModule,  SharedModule,                        // common ui and shared module
    UIRouterModule.forChild({states: states})          // feature routes
  ],
  declarations: [
    QuestionListComponent,
    QuestionDetailComponent,
    QuestionSettingComponent,
    QuestionFormComponent,
    AnswerFormComponent,
    AnswerVoteComponent
  ], // all private by default
  providers   : [
  ], // services which are public globally
  exports     : [
    QuestionListComponent,
    QuestionFormComponent,
    QuestionDetailComponent,
    QuestionSettingComponent,
  ]  // make some declarations public
})
export class QandaModule {

}
