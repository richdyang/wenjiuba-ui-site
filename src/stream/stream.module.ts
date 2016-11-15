import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {UIRouterModule} from "ui-router-ng2";
import {states} from "./stream.routes";
import {NgModule} from "@angular/core";
import {StreamListComponent} from "./components/stream-list";
import {WidgetModule} from "../widget/widget.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports     : [
        CommonModule, FormsModule, ReactiveFormsModule, HttpModule, // ng
        WidgetModule,  SharedModule,                        // common ui and shared module
        UIRouterModule.forChild({states: states})          // feature routes
    ],
    declarations: [
        StreamListComponent,
    ], // all private by default
    providers   : [], // services which are public globally
    exports     : [
        StreamListComponent
    ]  // make some declarations public
})
export class StreamModule {

}

