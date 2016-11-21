import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {UIRouterModule} from "ui-router-ng2";
import {states} from "./enoter.routes";
import {NgModule} from "@angular/core";
import {WidgetModule} from "../widget/widget.module";
import {SharedModule} from "../shared/shared.module";
import {EnoterComponent} from "./components/enoter";
import {EnoterReportFormComponent} from "./components/enoter-report-form";
import {EnoterReportListComponent} from "./components/enoter-report-list";

@NgModule({
    imports     : [
        CommonModule, FormsModule, ReactiveFormsModule, HttpModule, // ng
        WidgetModule,  SharedModule,                        // common ui and shared module
        UIRouterModule.forChild({states: states})          // feature routes
    ],
    declarations: [
        EnoterComponent, EnoterReportFormComponent, EnoterReportListComponent
    ], // all private by default
    providers   : [], // services which are public globally
    exports     : [
        EnoterComponent, EnoterReportFormComponent, EnoterReportListComponent
    ]  // make some declarations public
})
export class EnoterModule {

}
