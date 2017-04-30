import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CaseListComponent} from "./components/case-list";
import {CaseFormComponent} from "./components/case-form";
import {CommentFormComponent} from "./components/comment-form";
import {UIRouterModule} from "@uirouter/angular";
import {states} from "./case.routes";
import {NgModule} from "@angular/core";
import {CaseNewComponent} from "./components/case-new";
import {WidgetModule} from "../widget/widget.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports     : [
        CommonModule, FormsModule, ReactiveFormsModule, HttpModule, // ng
        WidgetModule,  SharedModule,                        // common ui and shared module
        UIRouterModule.forChild({states: states})          // feature routes
    ],
    declarations: [
        CaseListComponent,
        CaseFormComponent,
        CaseNewComponent,
        CommentFormComponent
    ], // all private by default
    providers   : [], // services which are public globally
    exports     : [
        CaseListComponent
    ]  // make some declarations public
})
export class CaseModule {

}

